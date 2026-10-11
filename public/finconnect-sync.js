/**
 * FinConnect & Friends Kredit Unified Sync Engine
 * Handles real-time cross-project state sync, 3-Tier DSA Verification Pipeline,
 * image loading fail-safes, and Quick Role Credentials switcher.
 */
(function() {
  // Ensure default demo staff and credentials exist
  const DEFAULT_STAFF = [
    {
      id: 'usr-super-admin',
      employeeCode: 'FK-EMP-001',
      name: 'Vikramaditya Singhania',
      email: 'admin@friendskredit.com',
      mobile: '+91 98201 12345',
      role: 'super_admin',
      title: 'Super Administrator',
      department: 'Executive Governance & Final Activation',
      status: 'active'
    },
    {
      id: 'usr-admin-ops',
      employeeCode: 'FK-EMP-002',
      name: 'Priya Nair',
      email: 'operations@friendskredit.com',
      mobile: '+91 98202 23456',
      role: 'admin',
      title: 'Operations & Processing Head',
      department: 'Central Lending Operations & Channel Clearance',
      status: 'active'
    },
    {
      id: 'usr-staff-underwriter',
      employeeCode: 'FK-EMP-003',
      name: 'Rohit Sharma',
      email: 'underwriter@friendskredit.com',
      mobile: '+91 98203 34567',
      role: 'staff',
      title: 'Senior Credit Underwriter',
      department: 'Credit Underwriting & KYC Scrutiny',
      status: 'active'
    }
  ];

  // Initialize staff if not set
  if (!localStorage.getItem('finconnect_staff_members')) {
    localStorage.setItem('finconnect_staff_members', JSON.stringify(DEFAULT_STAFF));
  }

  // Global Image Repair & Fallback Handler
  function setupImageResilience() {
    const fallbackMap = {
      'hero_finance_luxury': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80',
      'dsa_partner_growth': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
      'instant_kyc_security': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      'commercial_assets_loans': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    };

    window.addEventListener('error', function(event) {
      if (event.target && event.target.tagName === 'IMG') {
        const img = event.target;
        const currentSrc = img.src || '';
        
        // Prevent infinite error loop
        if (img.dataset.fallbackTried === 'true') return;
        img.dataset.fallbackTried = 'true';

        for (const [key, fallbackUrl] of Object.entries(fallbackMap)) {
          if (currentSrc.includes(key)) {
            img.src = fallbackUrl;
            return;
          }
        }
        
        // Generic fallback to elegant financial gradient placeholder
        img.src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80';
      }
    }, true);
  }

  setupImageResilience();

  // Cross-Window and Cross-Frame Sync
  window.FinConnectBridge = {
    // Record new customer loan application from Project 1 Home into Project 2
    recordLoanApplication: function(data) {
      try {
        const apps = JSON.parse(localStorage.getItem('finconnect_applications') || '[]');
        const custs = JSON.parse(localStorage.getItem('finconnect_customers') || '[]');
        const notifs = JSON.parse(localStorage.getItem('finconnect_notifications') || '[]');
        const logs = JSON.parse(localStorage.getItem('finconnect_audit_logs') || '[]');

        const appId = 'app-' + Date.now();
        const appNum = data.applicationNumber || ('APP-2026-' + Math.floor(100000 + Math.random() * 900000));
        const custId = 'cust-' + Date.now();

        // 1. New application entry
        const newApp = {
          id: appId,
          applicationNumber: appNum,
          partnerId: 'partner-direct',
          partnerName: 'Direct Online Applicant (Home Portal)',
          partnerCode: 'WEB-DIRECT',
          customerId: custId,
          customerName: data.customerName || 'Direct Customer',
          customerMobile: data.customerMobile || '9876543210',
          customerEmail: data.customerEmail || 'customer@friendskredit.com',
          customerPan: data.customerPan || 'PENDING-KYC',
          segmentId: 'seg-personal-loan',
          segmentName: data.loanType || data.segmentName || 'Personal Loan',
          companyId: 'comp-sbi',
          companyName: data.preferredBank || 'State Bank of India',
          companyLogo: 'https://images.unsplash.com/photo-1616803140344-6682afb13cda?auto=format&fit=crop&w=120&h=120&q=80',
          productId: 'prod-direct-pl',
          productName: data.loanType || 'Instant Digital Loan',
          productCode: 'DIR-LOAN',
          workflowType: 'loan',
          requestedAmount: Number(data.requestedAmount || data.loanAmount) || 500000,
          sanctionedAmount: Number(data.requestedAmount || data.loanAmount) || 500000,
          approvedAmount: Number(data.requestedAmount || data.loanAmount) || 500000,
          disbursedAmount: 0,
          status: 'submitted',
          stage: 'underwriting_queue',
          remarks: `Logged from Home Page: City: ${data.city || 'Mumbai'}, Income: ₹${data.monthlyIncome || 45000}, Employment: ${data.employmentType || 'Salaried'}`,
          customFieldValues: {
            employmentType: data.employmentType || 'Salaried',
            monthlyIncome: data.monthlyIncome || 45000,
            city: data.city || 'Mumbai'
          },
          createdAt: new Date().toISOString(),
          documents: [
            {
              id: 'doc-' + Date.now() + '-1',
              name: 'PAN Card (Scanned)',
              documentType: 'Identity',
              fileName: 'applicant_pan.pdf',
              status: 'pending'
            },
            {
              id: 'doc-' + Date.now() + '-2',
              name: 'Aadhaar e-KYC Verification',
              documentType: 'Address',
              fileName: 'aadhaar_ekyc.pdf',
              status: 'pending'
            }
          ]
        };

        // 2. New customer entry
        const newCust = {
          id: custId,
          partnerId: 'partner-direct',
          name: data.customerName || 'Direct Customer',
          mobile: data.customerMobile || '9876543210',
          email: data.customerEmail || 'customer@friendskredit.com',
          pan: data.customerPan || 'PENDING-KYC',
          city: data.city || 'Mumbai',
          state: data.state || 'Maharashtra',
          pin: '400001',
          employmentType: data.employmentType || 'Salaried',
          monthlyIncome: Number(data.monthlyIncome) || 45000,
          createdAt: new Date().toISOString()
        };

        // 3. Notification for staff/operations
        const newNotif = {
          id: 'notif-' + Date.now(),
          targetRole: 'admin',
          type: 'application',
          title: `New Loan Application: ${appNum}`,
          message: `${newApp.customerName} applied for ₹${newApp.requestedAmount.toLocaleString('en-IN')} ${newApp.productName} via Public Home Page.`,
          entityId: appId,
          isRead: false,
          createdAt: new Date().toISOString()
        };

        // 4. Audit Log
        const newLog = {
          id: 'log-' + Date.now(),
          timestamp: new Date().toISOString(),
          user: 'Public Portal Visitor',
          role: 'customer',
          action: 'Online Loan Application Submitted',
          entityType: 'Application',
          entityId: appNum,
          details: `Direct customer ${newApp.customerName} submitted loan application for ₹${newApp.requestedAmount.toLocaleString('en-IN')} (${newApp.productName})`
        };

        apps.unshift(newApp);
        custs.unshift(newCust);
        notifs.unshift(newNotif);
        logs.unshift(newLog);

        localStorage.setItem('finconnect_applications', JSON.stringify(apps));
        localStorage.setItem('finconnect_customers', JSON.stringify(custs));
        localStorage.setItem('finconnect_notifications', JSON.stringify(notifs));
        localStorage.setItem('finconnect_audit_logs', JSON.stringify(logs));
        localStorage.setItem('finconnect_last_sync', Date.now().toString());

        // Notify parent and window
        try {
          window.parent && window.parent.postMessage({ type: 'SYNC_DATA_UPDATE', dataType: 'LOAN_APPLICATION', app: newApp }, '*');
        } catch(e) {}

        return newApp;
      } catch (err) {
        console.error('Failed to sync loan application:', err);
      }
    },

    // Record new DSA Registration from Project 1 Home
    recordDsaRegistration: function(data) {
      try {
        const partners = JSON.parse(localStorage.getItem('finconnect_partners') || '[]');
        const notifs = JSON.parse(localStorage.getItem('finconnect_notifications') || '[]');
        const logs = JSON.parse(localStorage.getItem('finconnect_audit_logs') || '[]');

        const partnerCode = data.partnerCode || ('FK-DSA-' + Math.floor(10000 + Math.random() * 90000));
        const partnerId = 'partner-' + Date.now();

        const newPartner = {
          id: partnerId,
          partnerCode: partnerCode,
          name: data.fullName || data.name || 'New DSA Applicant',
          email: data.email || 'partner@friendskredit.com',
          mobile: data.mobile || '9876543210',
          businessName: (data.fullName || 'New Partner') + ' Financial Consultancy',
          currentProfession: data.currentProfession || 'Loan Agent / DSA',
          expectedMonthlyVolume: data.expectedMonthlyVolume || '₹50 Lakhs - ₹1 Crore',
          pan: 'PENDING-KYC',
          address: `${data.city || 'Regional Center'}, ${data.state || 'Maharashtra'}`,
          city: data.city || 'Mumbai',
          state: data.state || 'Maharashtra',
          pin: '400001',
          
          // 3-Tier Multi-Department Verification Pipeline
          status: 'pending_underwriter', // pending_underwriter -> underwriter_verified -> operations_verified -> active
          underwriterStatus: 'pending',   // 'pending' | 'verified'
          underwriterVerifiedBy: null,
          underwriterVerifiedAt: null,
          underwriterNotes: 'Awaiting KYC document verification & eligibility scrutiny',

          operationsStatus: 'pending',    // 'pending' | 'verified'
          operationsVerifiedBy: null,
          operationsVerifiedAt: null,
          operationsNotes: 'Awaiting channel agreement and SLA clearance',

          superAdminStatus: 'pending',    // 'pending' | 'verified'
          superAdminActivatedBy: null,
          superAdminActivatedAt: null,
          superAdminNotes: 'Awaiting executive activation and credential assignment',

          bankName: 'State Bank of India',
          accountNumber: '••••••••••••',
          ifscCode: 'SBIN0008831',
          createdAt: new Date().toISOString()
        };

        const newNotif = {
          id: 'notif-' + Date.now(),
          targetRole: 'admin',
          type: 'partner_registration',
          title: `New DSA Registration: ${partnerCode}`,
          message: `${newPartner.name} applied as DSA Partner. Awaiting Staff / Underwriter KYC verification.`,
          entityId: partnerId,
          isRead: false,
          createdAt: new Date().toISOString()
        };

        const newLog = {
          id: 'log-' + Date.now(),
          timestamp: new Date().toISOString(),
          user: newPartner.name,
          role: 'retail_partner',
          action: 'DSA Partner Onboarding Registered',
          entityType: 'Partner',
          entityId: partnerCode,
          details: `New DSA enrollment submitted by ${newPartner.name} (${newPartner.city}, Volume: ${newPartner.expectedMonthlyVolume}). Verification initiated.`
        };

        partners.unshift(newPartner);
        notifs.unshift(newNotif);
        logs.unshift(newLog);

        localStorage.setItem('finconnect_partners', JSON.stringify(partners));
        localStorage.setItem('finconnect_notifications', JSON.stringify(notifs));
        localStorage.setItem('finconnect_audit_logs', JSON.stringify(logs));
        localStorage.setItem('finconnect_last_sync', Date.now().toString());

        try {
          window.parent && window.parent.postMessage({ type: 'SYNC_DATA_UPDATE', dataType: 'DSA_REGISTRATION', partner: newPartner }, '*');
        } catch(e) {}

        return newPartner;
      } catch (err) {
        console.error('Failed to sync DSA registration:', err);
      }
    },

    // 3-Tier DSA Verification Actions
    verifyDsaByStaffUnderwriter: function(partnerId, notes) {
      try {
        const partners = JSON.parse(localStorage.getItem('finconnect_partners') || '[]');
        const logs = JSON.parse(localStorage.getItem('finconnect_audit_logs') || '[]');
        const notifs = JSON.parse(localStorage.getItem('finconnect_notifications') || '[]');

        const idx = partners.findIndex(p => p.id === partnerId || p.partnerCode === partnerId);
        if (idx === -1) return false;

        partners[idx].underwriterStatus = 'verified';
        partners[idx].underwriterVerifiedBy = 'Rohit Sharma (Senior Underwriter)';
        partners[idx].underwriterVerifiedAt = new Date().toISOString();
        partners[idx].underwriterNotes = notes || 'KYC documents, mobile OTP, and CIBIL eligibility verified.';
        partners[idx].status = 'underwriter_verified';

        logs.unshift({
          id: 'log-' + Date.now(),
          timestamp: new Date().toISOString(),
          user: 'Rohit Sharma',
          role: 'staff',
          action: 'Staff/Underwriter DSA KYC Verified',
          entityType: 'Partner',
          entityId: partners[idx].partnerCode,
          details: `Staff Underwriter Rohit Sharma completed KYC and background scrutiny for ${partners[idx].name}. Forwarded to Admin / Operations.`
        });

        notifs.unshift({
          id: 'notif-' + Date.now(),
          targetRole: 'admin',
          type: 'verification',
          title: `Underwriter Cleared: ${partners[idx].partnerCode}`,
          message: `${partners[idx].name} verified by Underwriting. Ready for Operations Agreement check.`,
          entityId: partnerId,
          isRead: false,
          createdAt: new Date().toISOString()
        });

        localStorage.setItem('finconnect_partners', JSON.stringify(partners));
        localStorage.setItem('finconnect_audit_logs', JSON.stringify(logs));
        localStorage.setItem('finconnect_notifications', JSON.stringify(notifs));
        localStorage.setItem('finconnect_last_sync', Date.now().toString());
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    verifyDsaByAdminOperations: function(partnerId, notes) {
      try {
        const partners = JSON.parse(localStorage.getItem('finconnect_partners') || '[]');
        const logs = JSON.parse(localStorage.getItem('finconnect_audit_logs') || '[]');
        const notifs = JSON.parse(localStorage.getItem('finconnect_notifications') || '[]');

        const idx = partners.findIndex(p => p.id === partnerId || p.partnerCode === partnerId);
        if (idx === -1) return false;

        partners[idx].operationsStatus = 'verified';
        partners[idx].operationsVerifiedBy = 'Priya Nair (Operations Head)';
        partners[idx].operationsVerifiedAt = new Date().toISOString();
        partners[idx].operationsNotes = notes || 'Channel agreement executed and bank payout account verified.';
        partners[idx].status = 'operations_verified';

        logs.unshift({
          id: 'log-' + Date.now(),
          timestamp: new Date().toISOString(),
          user: 'Priya Nair',
          role: 'admin',
          action: 'Admin/Operations DSA Cleared',
          entityType: 'Partner',
          entityId: partners[idx].partnerCode,
          details: `Operations Head Priya Nair cleared channel agreement and operational SLA for ${partners[idx].name}. Forwarded to Super Admin for final activation.`
        });

        notifs.unshift({
          id: 'notif-' + Date.now(),
          targetRole: 'super_admin',
          type: 'verification',
          title: `Operations Cleared: ${partners[idx].partnerCode}`,
          message: `${partners[idx].name} cleared by Operations. Awaiting Super Admin final activation.`,
          entityId: partnerId,
          isRead: false,
          createdAt: new Date().toISOString()
        });

        localStorage.setItem('finconnect_partners', JSON.stringify(partners));
        localStorage.setItem('finconnect_audit_logs', JSON.stringify(logs));
        localStorage.setItem('finconnect_notifications', JSON.stringify(notifs));
        localStorage.setItem('finconnect_last_sync', Date.now().toString());
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    activateDsaBySuperAdmin: function(partnerId, notes) {
      try {
        const partners = JSON.parse(localStorage.getItem('finconnect_partners') || '[]');
        const logs = JSON.parse(localStorage.getItem('finconnect_audit_logs') || '[]');
        const notifs = JSON.parse(localStorage.getItem('finconnect_notifications') || '[]');

        const idx = partners.findIndex(p => p.id === partnerId || p.partnerCode === partnerId);
        if (idx === -1) return false;

        partners[idx].superAdminStatus = 'verified';
        partners[idx].superAdminActivatedBy = 'Vikramaditya Singhania (Super Admin)';
        partners[idx].superAdminActivatedAt = new Date().toISOString();
        partners[idx].superAdminNotes = notes || 'Master activation signed off. Official partner credentials activated.';
        partners[idx].status = 'active';
        partners[idx].password = 'Partner@2026';

        logs.unshift({
          id: 'log-' + Date.now(),
          timestamp: new Date().toISOString(),
          user: 'Vikramaditya Singhania',
          role: 'super_admin',
          action: 'Super Admin DSA Partner ACTIVATED',
          entityType: 'Partner',
          entityId: partners[idx].partnerCode,
          details: `Super Admin Vikramaditya Singhania officially ACTIVATED DSA Partner ${partners[idx].name} (${partners[idx].partnerCode}). Full partner portal login enabled.`
        });

        notifs.unshift({
          id: 'notif-' + Date.now(),
          targetRole: 'retail_partner',
          type: 'system',
          title: `Account Activated! Welcome ${partners[idx].name}`,
          message: `Your Friends Kredit DSA Partner account (${partners[idx].partnerCode}) has been fully activated by Super Admin.`,
          entityId: partnerId,
          isRead: false,
          createdAt: new Date().toISOString()
        });

        localStorage.setItem('finconnect_partners', JSON.stringify(partners));
        localStorage.setItem('finconnect_audit_logs', JSON.stringify(logs));
        localStorage.setItem('finconnect_notifications', JSON.stringify(notifs));
        localStorage.setItem('finconnect_last_sync', Date.now().toString());
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  };

})();
