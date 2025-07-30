-- BizKuKu Database Schema
-- This file contains the database schema for the BizKuKu MSME platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users profile table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company_name TEXT,
    business_type TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'Malaysia',
    avatar_url TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business information table
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL, -- 'retail', 'service', 'manufacturing', etc.
    registration_number TEXT,
    tax_number TEXT,
    industry TEXT,
    annual_revenue DECIMAL,
    employee_count INTEGER,
    established_date DATE,
    description TEXT,
    website TEXT,
    social_media JSONB, -- Store social media links
    business_status TEXT DEFAULT 'active', -- 'active', 'inactive', 'pending'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create financial records table
CREATE TABLE IF NOT EXISTS public.financial_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    record_type TEXT NOT NULL, -- 'income', 'expense', 'asset', 'liability'
    category TEXT NOT NULL,
    amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'MYR',
    description TEXT,
    transaction_date DATE NOT NULL,
    receipt_url TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loan applications table
CREATE TABLE IF NOT EXISTS public.loan_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    loan_type TEXT NOT NULL, -- 'business_loan', 'equipment_loan', 'working_capital'
    requested_amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'MYR',
    purpose TEXT NOT NULL,
    application_status TEXT DEFAULT 'draft', -- 'draft', 'submitted', 'under_review', 'approved', 'rejected'
    application_data JSONB, -- Store form data
    documents JSONB, -- Store document URLs and metadata
    lender_info JSONB, -- Store matched lender information
    approval_date DATE,
    disbursement_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create grant applications table
CREATE TABLE IF NOT EXISTS public.grant_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    grant_program TEXT NOT NULL,
    grant_provider TEXT NOT NULL, -- 'government', 'private', 'ngo'
    requested_amount DECIMAL NOT NULL,
    currency TEXT DEFAULT 'MYR',
    application_status TEXT DEFAULT 'draft',
    application_data JSONB,
    documents JSONB,
    deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create compliance records table
CREATE TABLE IF NOT EXISTS public.compliance_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    compliance_type TEXT NOT NULL, -- 'tax', 'license', 'permit', 'certification'
    requirement_name TEXT NOT NULL,
    status TEXT NOT NULL, -- 'compliant', 'non_compliant', 'pending', 'expired'
    due_date DATE,
    completion_date DATE,
    document_url TEXT,
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create face verification records table (for login security)
CREATE TABLE IF NOT EXISTS public.face_verifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    verification_type TEXT NOT NULL, -- 'blink', 'head_turn', 'nod'
    verification_status TEXT NOT NULL, -- 'passed', 'failed'
    confidence_score DECIMAL,
    face_image_url TEXT, -- For AWS Face Recognition integration
    session_token TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- 'info', 'warning', 'success', 'error'
    category TEXT, -- 'loan', 'grant', 'compliance', 'system'
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    action TEXT NOT NULL,
    table_name TEXT,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON public.businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_records_updated_at BEFORE UPDATE ON public.financial_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loan_applications_updated_at BEFORE UPDATE ON public.loan_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_grant_applications_updated_at BEFORE UPDATE ON public.grant_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compliance_records_updated_at BEFORE UPDATE ON public.compliance_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grant_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.face_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for businesses
CREATE POLICY "Users can view own businesses" ON public.businesses FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own businesses" ON public.businesses FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own businesses" ON public.businesses FOR UPDATE USING (user_id = auth.uid());

-- RLS Policies for financial_records
CREATE POLICY "Users can view own financial records" ON public.financial_records FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can insert own financial records" ON public.financial_records FOR INSERT WITH CHECK (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update own financial records" ON public.financial_records FOR UPDATE USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

-- Similar RLS policies for other tables...
CREATE POLICY "Users can view own loan applications" ON public.loan_applications FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can manage own loan applications" ON public.loan_applications FOR ALL USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

CREATE POLICY "Users can view own grant applications" ON public.grant_applications FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can manage own grant applications" ON public.grant_applications FOR ALL USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

CREATE POLICY "Users can view own compliance records" ON public.compliance_records FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can manage own compliance records" ON public.compliance_records FOR ALL USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

CREATE POLICY "Users can view own face verifications" ON public.face_verifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own face verifications" ON public.face_verifications FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON public.businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_records_business_id ON public.financial_records(business_id);
CREATE INDEX IF NOT EXISTS idx_financial_records_date ON public.financial_records(transaction_date);
CREATE INDEX IF NOT EXISTS idx_loan_applications_business_id ON public.loan_applications(business_id);
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON public.loan_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_grant_applications_business_id ON public.grant_applications(business_id);
CREATE INDEX IF NOT EXISTS idx_compliance_records_business_id ON public.compliance_records(business_id);
CREATE INDEX IF NOT EXISTS idx_compliance_records_due_date ON public.compliance_records(due_date);
CREATE INDEX IF NOT EXISTS idx_face_verifications_user_id ON public.face_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);

-- Insert some sample data (optional)
-- This will be executed only if there are no existing profiles
DO $$
BEGIN
    -- Only insert sample data if tables are empty
    IF (SELECT COUNT(*) FROM public.user_profiles) = 0 THEN
        -- Sample data can be added here if needed
        RAISE NOTICE 'Database schema created successfully. Ready for your BizKuKu application!';
    END IF;
END $$;