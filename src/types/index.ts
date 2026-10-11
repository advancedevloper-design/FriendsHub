export type UserRole = 'customer' | 'dsa_agent' | 'retailer' | 'staff' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
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
  partnerCode?: string;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  updatedAt?: string;
}

export type ApplicationStatus =
  | 'new_application'
  | 'under_process'
  | 'pending_disburse'
  | 'commission_verify'
  | 'ready_to_release'
  | 'disbursed'
  | 'rejected';

export interface LoanApplication {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantMobile: string;
  productId: string;
  productName: string;
  bankId: string;
  bankName: string;
  requestedAmount: number;
  disbursedAmount?: number;
  tenureMonths: number;
  interestRate: number;
  status: ApplicationStatus;
  partnerId: string;
  partnerCode?: string;
  partnerName?: string;
  commissionAmount?: number;
  commissionStatus?: 'pending' | 'verified' | 'released';
  panNumber?: string;
  aadhaarNumber?: string;
  employmentType?: 'salaried' | 'self_employed' | 'business';
  monthlyIncome?: number;
  cibilScore?: number;
  documentsSubmitted?: string[];
  remarks?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BankVaultItem {
  id: string;
  name: string;
  category: 'bank' | 'nbfc' | 'fintech' | 'insurance' | 'brokerage' | 'egov';
  logo: string;
  website: string;
  description: string;
  portalUrl: string;
  partnerCode: string;
  branchCode?: string;
  allowPartnerAccess: boolean;
  notes: string;
  supportEmail: string;
  supportPhone: string;
  status: 'active' | 'maintenance';
}

export interface PolicyDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  category: string;
  bankName: string;
  description: string;
  uploadedAt: string;
  uploadedBy: string;
  isVisibleToPartner: boolean;
  pageCount: number;
  previewContent: {
    summary: string;
    highlights: string[];
    eligibilityMatrix: {
      profile: string;
      minSalary: string;
      maxMultiplier: string;
      foir: string;
    }[];
    documentChecklist: string[];
  };
}

export interface FinancialProduct {
  id: string;
  name: string;
  category: 'personal' | 'business' | 'home' | 'vehicle' | 'instant' | 'insurance' | 'cards_investment';
  categoryLabel: string;
  tagline: string;
  interestRate: string;
  maxAmount: string;
  tenure: string;
  processingTime: string;
  features: string[];
  eligibility: string;
  documents: string[];
  popular?: boolean;
  highlightBadge?: string;
  partnerCommissionRate?: string;
  lenders?: string[];
}

export interface CommissionRecord {
  id: string;
  partnerId: string;
  partnerCode: string;
  partnerName: string;
  applicationId: string;
  applicantName: string;
  productName: string;
  disbursedAmount: number;
  commissionRate: number;
  commissionAmount: number;
  payoutStatus: 'pending' | 'verified' | 'released';
  transactionReference?: string;
  releasedAt?: string;
  createdAt: string;
}
