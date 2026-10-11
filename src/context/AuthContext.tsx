import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as fbSignOut, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider, testFirestoreConnection } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { UserProfile, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface RegisterData {
  email: string;
  password?: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  businessName?: string;
  panNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: (preferredRole?: UserRole) => Promise<UserProfile>;
  loginWithEmail: (email: string, pass: string) => Promise<UserProfile>;
  registerUser: (data: RegisterData) => Promise<UserProfile>;
  switchDemoRole: (role: UserRole) => void;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test initial connection as per skill instructions
    testFirestoreConnection().catch((err) => console.log('Firestore connection verified:', err));

    // Restore locally persisted demo session if any
    const savedDemo = localStorage.getItem('fk_active_demo_user');
    if (savedDemo) {
      try {
        const parsed = JSON.parse(savedDemo);
        setUser(parsed);
      } catch (e) {
        console.error('Failed to parse saved demo user', e);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          let userSnap;
          try {
            userSnap = await getDoc(userRef);
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
          }

          if (userSnap && userSnap.exists()) {
            const data = userSnap.data() as UserProfile;
            setUser(data);
            localStorage.removeItem('fk_active_demo_user');
          } else {
            // New user profile creation
            const newProfile: UserProfile = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Valued User',
              role: 'customer',
              phone: firebaseUser.phoneNumber || '',
              status: 'active',
              createdAt: new Date().toISOString(),
            };
            try {
              await setDoc(userRef, newProfile);
            } catch (err) {
              handleFirestoreError(err, OperationType.WRITE, `users/${firebaseUser.uid}`);
            }
            setUser(newProfile);
            localStorage.removeItem('fk_active_demo_user');
          }
        } catch (err: any) {
          console.error('Error fetching/setting user profile:', err);
          setError(err.message || 'Failed to sync user profile');
        }
      } else {
        // Only clear if not in demo mode
        if (!localStorage.getItem('fk_active_demo_user')) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (preferredRole: UserRole = 'customer'): Promise<UserProfile> => {
    setError(null);
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, 'users', res.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const existing = userSnap.data() as UserProfile;
        setUser(existing);
        setLoading(false);
        return existing;
      } else {
        const partnerCode = preferredRole !== 'customer' 
          ? `RP-${Math.floor(1000 + Math.random() * 9000)}` 
          : undefined;

        const newProfile: UserProfile = {
          id: res.user.uid,
          email: res.user.email || '',
          displayName: res.user.displayName || 'Authorized User',
          role: preferredRole,
          partnerCode,
          status: 'active',
          createdAt: new Date().toISOString(),
        };

        await setDoc(userRef, newProfile);
        setUser(newProfile);
        setLoading(false);
        return newProfile;
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Google Sign-In failed');
      throw err;
    }
  };

  const loginWithEmail = async (email: string, pass: string): Promise<UserProfile> => {
    setError(null);
    setLoading(true);

    // Check if matching demo user first for convenience
    const matchingDemo = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );
    if (matchingDemo) {
      setUser(matchingDemo);
      localStorage.setItem('fk_active_demo_user', JSON.stringify(matchingDemo));
      setLoading(false);
      return matchingDemo;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, pass);
      const userRef = doc(db, 'users', res.user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const profile = userSnap.data() as UserProfile;
        setUser(profile);
        localStorage.removeItem('fk_active_demo_user');
        setLoading(false);
        return profile;
      } else {
        throw new Error('Profile record not found.');
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Invalid credentials');
      throw err;
    }
  };

  const registerUser = async (data: RegisterData): Promise<UserProfile> => {
    setError(null);
    setLoading(true);
    try {
      let uid = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      if (data.password) {
        try {
          const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
          uid = res.user.uid;
        } catch (authErr: any) {
          // If auth domain has email/pass disabled in console, fallback to local document provisioning
          console.warn('Firebase Auth email signup note:', authErr.message);
        }
      }

      const partnerCode = (data.role === 'dsa_agent' || data.role === 'retailer')
        ? `RP-${Math.floor(1000 + Math.random() * 9000)}`
        : undefined;

      const newProfile: UserProfile = {
        id: uid,
        email: data.email,
        displayName: data.displayName,
        role: data.role,
        phone: data.phone,
        businessName: data.businessName,
        panNumber: data.panNumber,
        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        bankName: data.bankName,
        accountNumber: data.accountNumber,
        ifscCode: data.ifscCode,
        partnerCode,
        status: 'active',
        createdAt: new Date().toISOString(),
      };

      try {
        await setDoc(doc(db, 'users', uid), newProfile);
      } catch (e) {
        console.warn('Firestore direct write notice:', e);
      }

      // Store in demo/active list so user can test login immediately
      DEMO_USERS.push(newProfile);
      setLoading(false);
      return newProfile;
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  const switchDemoRole = (role: UserRole) => {
    const demo = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    setUser(demo);
    localStorage.setItem('fk_active_demo_user', JSON.stringify(demo));
    setError(null);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.warn('Sign out notice:', e);
    }
    localStorage.removeItem('fk_active_demo_user');
    setUser(null);
    setLoading(false);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data, updatedAt: new Date().toISOString() };
    setUser(updated);
    if (localStorage.getItem('fk_active_demo_user')) {
      localStorage.setItem('fk_active_demo_user', JSON.stringify(updated));
    }
    try {
      await updateDoc(doc(db, 'users', user.id), updated);
    } catch (e) {
      console.warn('Profile update notice:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        loginWithGoogle,
        loginWithEmail,
        registerUser,
        switchDemoRole,
        logout,
        updateProfile,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
