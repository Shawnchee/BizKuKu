-- ================================================
-- BizKuKu Complete Personalization Schema Migration
-- FINAL VERSION with rekognition_id and password
-- ================================================

BEGIN;

-- ================================
-- 1. USER PREFERENCES TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    
    -- UI Preferences
    preferred_language TEXT DEFAULT 'en', -- 'en', 'ms'
    theme TEXT DEFAULT 'light', -- 'light', 'dark', 'auto'
    dashboard_layout TEXT DEFAULT 'default', -- 'default', 'compact', 'detailed'
    currency_display TEXT DEFAULT 'MYR',
    
    -- Content Preferences
    show_recommendations BOOLEAN DEFAULT TRUE,
    show_financial_insights BOOLEAN DEFAULT TRUE,
    show_platform_suggestions BOOLEAN DEFAULT TRUE,
    preferred_communication TEXT DEFAULT 'email', -- 'email', 'sms', 'push', 'none'
    
    -- Business Focus Areas (JSON array)
    focus_areas JSONB DEFAULT '[]', -- ['loans', 'grants', 'digitalization', 'compliance']
    
    -- Notification Preferences
    email_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    push_notifications BOOLEAN DEFAULT TRUE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one preference record per user
    UNIQUE(user_id)
);

-- ================================
-- 2. BUSINESS CATEGORIES & INDUSTRIES TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.business_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    
    -- Enhanced Business Classification
    primary_category TEXT NOT NULL, -- 'food_beverage', 'retail', 'services', 'manufacturing', 'agriculture'
    sub_category TEXT, -- 'restaurant', 'cafe', 'clothing_store', 'electronics'
    industry_code TEXT, -- Malaysian Standard Industrial Classification (MSIC) code
    business_model TEXT, -- 'b2c', 'b2b', 'marketplace', 'subscription'
    
    -- Target Market
    target_market JSONB DEFAULT '[]', -- ['local', 'national', 'international']
    customer_segments JSONB DEFAULT '[]', -- ['individuals', 'small_business', 'enterprise']
    
    -- Business Characteristics
    seasonal_business BOOLEAN DEFAULT FALSE,
    online_presence BOOLEAN DEFAULT FALSE,
    physical_location BOOLEAN DEFAULT TRUE,
    
    -- Compliance Requirements
    license_requirements JSONB DEFAULT '[]', -- ['halal', 'food_handler', 'pharmacy']
    tax_obligations JSONB DEFAULT '[]', -- ['gst', 'sst', 'income_tax']
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one category record per business
    UNIQUE(business_id)
);

-- ================================
-- 3. PLATFORM CONNECTIONS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.platform_connections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    
    -- Platform Details
    platform_name TEXT NOT NULL, -- 'shopee', 'lazada', 'grabfood', 'foodpanda'
    platform_category TEXT NOT NULL, -- 'ecommerce', 'food_delivery', 'social_media'
    connection_status TEXT DEFAULT 'pending', -- 'pending', 'connected', 'error', 'disconnected'
    
    -- Connection Data
    platform_account_id TEXT,
    connection_date TIMESTAMP WITH TIME ZONE,
    last_sync_date TIMESTAMP WITH TIME ZONE,
    
    -- Platform-specific Settings
    sync_enabled BOOLEAN DEFAULT TRUE,
    auto_sync_frequency TEXT DEFAULT 'daily', -- 'realtime', 'hourly', 'daily', 'weekly'
    
    -- Performance Data
    platform_stats JSONB DEFAULT '{}', -- {'orders': 0, 'revenue': 0, 'products': 0}
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique platform per business
    UNIQUE(business_id, platform_name)
);

-- ================================
-- 4. USER RECOMMENDATIONS HISTORY TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.recommendation_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    
    -- Recommendation Details
    recommendation_type TEXT NOT NULL, -- 'loan', 'grant', 'service', 'platform'
    recommendation_category TEXT, -- 'funding', 'digitalization', 'compliance'
    
    -- Request Parameters
    requested_amount DECIMAL,
    funding_purpose TEXT,
    business_context TEXT,
    user_preferences JSONB DEFAULT '{}',
    
    -- Generated Recommendations
    recommendations_data JSONB NOT NULL, -- Array of recommendation objects
    recommendation_count INTEGER DEFAULT 0,
    
    -- User Interaction
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    clicked_recommendations JSONB DEFAULT '[]', -- Array of clicked recommendation IDs
    applied_recommendations JSONB DEFAULT '[]', -- Array of applied recommendation IDs
    
    -- AI/ML Tracking
    model_version TEXT DEFAULT 'v1.0',
    confidence_score DECIMAL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- 5. BUSINESS INSIGHTS & ANALYTICS STORAGE
-- ================================
CREATE TABLE IF NOT EXISTS public.business_insights (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    
    -- Insight Details
    insight_type TEXT NOT NULL, -- 'financial', 'customer', 'market', 'operational'
    insight_category TEXT, -- 'revenue_trend', 'customer_retention', 'peak_hours'
    
    -- Insight Data
    insight_title TEXT NOT NULL,
    insight_description TEXT,
    insight_value JSONB NOT NULL, -- Structured insight data
    
    -- Time Period
    period_start DATE,
    period_end DATE,
    calculation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Relevance & Priority
    priority_score INTEGER DEFAULT 0, -- 0-100
    is_actionable BOOLEAN DEFAULT FALSE,
    action_recommendations JSONB DEFAULT '[]',
    
    -- Display Settings
    display_on_dashboard BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- 6. CONTENT PERSONALIZATION RULES
-- ================================
CREATE TABLE IF NOT EXISTS public.content_personalization_rules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Rule Definition
    rule_name TEXT NOT NULL,
    rule_type TEXT NOT NULL, -- 'business_type', 'industry', 'revenue_range', 'user_behavior'
    
    -- Conditions (JSON for complex rules)
    conditions JSONB NOT NULL, -- {'business_type': 'restaurant', 'annual_revenue': {'min': 100000}}
    
    -- Content Configuration
    content_type TEXT NOT NULL, -- 'dashboard_widget', 'recommendation', 'service_suggestion'
    content_config JSONB NOT NULL, -- Configuration for the personalized content
    
    -- Rule Metadata
    is_active BOOLEAN DEFAULT TRUE,
    priority INTEGER DEFAULT 0,
    effective_from DATE DEFAULT CURRENT_DATE,
    effective_until DATE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- 7. ENHANCE EXISTING TABLES
-- ================================

-- Add new columns to user_profiles table
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS user_role TEXT DEFAULT 'business_owner';
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 0;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS profile_completion_score INTEGER DEFAULT 0;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS last_active_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending';
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS rekognition_id TEXT;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS password TEXT;

-- Add new columns to businesses table
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS business_size TEXT; -- 'micro', 'small', 'medium'
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS monthly_revenue_range TEXT; -- '0-5k', '5k-20k', '20k-50k', '50k+'
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS digital_maturity_score INTEGER DEFAULT 0; -- 0-100
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS compliance_score INTEGER DEFAULT 0; -- 0-100
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS risk_profile TEXT DEFAULT 'medium'; -- 'low', 'medium', 'high'
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS business_goals JSONB DEFAULT '[]'; -- ['growth', 'digitalization', 'compliance']

-- Add unique constraint for rekognition_id (each user should have unique face ID)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_rekognition_id'
    ) THEN
        ALTER TABLE public.user_profiles ADD CONSTRAINT unique_rekognition_id UNIQUE (rekognition_id);
    END IF;
END $$;

-- ================================
-- 8. CREATE PERFORMANCE INDEXES
-- ================================

-- User Preferences
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_language ON public.user_preferences(preferred_language);

-- Business Categories
CREATE INDEX IF NOT EXISTS idx_business_categories_business_id ON public.business_categories(business_id);
CREATE INDEX IF NOT EXISTS idx_business_categories_primary_category ON public.business_categories(primary_category);
CREATE INDEX IF NOT EXISTS idx_business_categories_industry_code ON public.business_categories(industry_code);

-- Platform Connections
CREATE INDEX IF NOT EXISTS idx_platform_connections_business_id ON public.platform_connections(business_id);
CREATE INDEX IF NOT EXISTS idx_platform_connections_status ON public.platform_connections(connection_status);
CREATE INDEX IF NOT EXISTS idx_platform_connections_platform ON public.platform_connections(platform_name);

-- Recommendation History
CREATE INDEX IF NOT EXISTS idx_recommendation_history_user_id ON public.recommendation_history(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendation_history_business_id ON public.recommendation_history(business_id);
CREATE INDEX IF NOT EXISTS idx_recommendation_history_type ON public.recommendation_history(recommendation_type);
CREATE INDEX IF NOT EXISTS idx_recommendation_history_date ON public.recommendation_history(created_at);

-- Business Insights
CREATE INDEX IF NOT EXISTS idx_business_insights_business_id ON public.business_insights(business_id);
CREATE INDEX IF NOT EXISTS idx_business_insights_type ON public.business_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_business_insights_dashboard ON public.business_insights(display_on_dashboard);
CREATE INDEX IF NOT EXISTS idx_business_insights_priority ON public.business_insights(priority_score);

-- Content Rules
CREATE INDEX IF NOT EXISTS idx_content_rules_type ON public.content_personalization_rules(rule_type);
CREATE INDEX IF NOT EXISTS idx_content_rules_active ON public.content_personalization_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_content_rules_content_type ON public.content_personalization_rules(content_type);

-- Enhanced existing table indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(user_role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_onboarding ON public.user_profiles(onboarding_step);
CREATE INDEX IF NOT EXISTS idx_user_profiles_verification ON public.user_profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_rekognition_id ON public.user_profiles(rekognition_id);
CREATE INDEX IF NOT EXISTS idx_businesses_size ON public.businesses(business_size);
CREATE INDEX IF NOT EXISTS idx_businesses_revenue_range ON public.businesses(monthly_revenue_range);

-- ================================
-- 9. ROW LEVEL SECURITY POLICIES
-- ================================

-- Enable RLS on new tables
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_personalization_rules ENABLE ROW LEVEL SECURITY;

-- User Preferences RLS Policies
CREATE POLICY "Users can view own preferences" ON public.user_preferences FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own preferences" ON public.user_preferences FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own preferences" ON public.user_preferences FOR UPDATE USING (user_id = auth.uid());

-- Business Categories RLS Policies
CREATE POLICY "Users can view own business categories" ON public.business_categories FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can manage own business categories" ON public.business_categories FOR ALL USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

-- Platform Connections RLS Policies
CREATE POLICY "Users can view own platform connections" ON public.platform_connections FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can manage own platform connections" ON public.platform_connections FOR ALL USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

-- Recommendation History RLS Policies
CREATE POLICY "Users can view own recommendation history" ON public.recommendation_history FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own recommendation history" ON public.recommendation_history FOR INSERT WITH CHECK (user_id = auth.uid());

-- Business Insights RLS Policies
CREATE POLICY "Users can view own business insights" ON public.business_insights FOR SELECT USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);
CREATE POLICY "Users can manage own business insights" ON public.business_insights FOR ALL USING (
    business_id IN (SELECT id FROM public.businesses WHERE user_id = auth.uid())
);

-- Content Personalization Rules RLS Policies (Public read access for rules)
CREATE POLICY "Anyone can view active content rules" ON public.content_personalization_rules FOR SELECT USING (is_active = true);

-- ================================
-- 10. UPDATE TRIGGERS FOR UPDATED_AT
-- ================================

-- Add updated_at triggers for new tables
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_categories_updated_at BEFORE UPDATE ON public.business_categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_connections_updated_at BEFORE UPDATE ON public.platform_connections 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_insights_updated_at BEFORE UPDATE ON public.business_insights 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_rules_updated_at BEFORE UPDATE ON public.content_personalization_rules 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================
-- 11. INSERT SAMPLE DATA FOR TESTING
-- ================================

-- Insert some default content personalization rules
INSERT INTO public.content_personalization_rules (rule_name, rule_type, conditions, content_type, content_config) VALUES
('Restaurant Dashboard Widgets', 'business_type', '{"primary_category": "food_beverage"}', 'dashboard_widget', '{"widgets": ["daily_sales", "popular_items", "peak_hours", "customer_feedback"]}'),
('Retail Analytics', 'business_type', '{"primary_category": "retail"}', 'dashboard_widget', '{"widgets": ["inventory_turnover", "seasonal_trends", "customer_segments", "profit_margins"]}'),
('Service Business Insights', 'business_type', '{"primary_category": "services"}', 'dashboard_widget', '{"widgets": ["appointment_booking", "service_ratings", "client_retention", "revenue_per_service"]}'),
('Manufacturing KPIs', 'business_type', '{"primary_category": "manufacturing"}', 'dashboard_widget', '{"widgets": ["production_efficiency", "quality_metrics", "supply_chain", "equipment_status"]}'),
('Agriculture Tracking', 'business_type', '{"primary_category": "agriculture"}', 'dashboard_widget', '{"widgets": ["crop_cycle", "weather_impact", "market_prices", "seasonal_planning"]}'),
('Micro Business Loans', 'business_size', '{"business_size": "micro"}', 'recommendation', '{"focus": ["tekun", "sme_digitalisation", "micro_grants"], "max_amount": 50000}'),
('Small Business Growth', 'business_size', '{"business_size": "small"}', 'recommendation', '{"focus": ["sme_bank", "development_bank", "equipment_loans"], "max_amount": 500000}'),
('Medium Enterprise Funding', 'business_size', '{"business_size": "medium"}', 'recommendation', '{"focus": ["conventional_banks", "venture_capital", "expansion_loans"], "max_amount": 2000000}'),
('High Revenue Services', 'revenue_range', '{"monthly_revenue_range": "50k+"}', 'service_suggestion', '{"services": ["advanced_analytics", "tax_optimization", "investment_planning", "business_expansion"]}'),
('Starter Business Services', 'revenue_range', '{"monthly_revenue_range": "0-5k"}', 'service_suggestion', '{"services": ["basic_accounting", "simple_invoicing", "social_media_setup", "compliance_basics"]}'} 
ON CONFLICT DO NOTHING;

COMMIT;

-- ================================
-- 12. SUCCESS MESSAGE
-- ================================
DO $$
BEGIN
    RAISE NOTICE '🎉 BizKuKu Complete Personalization Schema Migration COMPLETED!';
    RAISE NOTICE '========================================================';
    RAISE NOTICE '✅ Added 6 new tables for comprehensive personalization';
    RAISE NOTICE '✅ Enhanced user_profiles with rekognition_id & password';
    RAISE NOTICE '✅ Enhanced businesses table with classification fields';
    RAISE NOTICE '✅ Created 20+ performance indexes';
    RAISE NOTICE '✅ Configured Row Level Security policies';
    RAISE NOTICE '✅ Added update triggers for timestamps';
    RAISE NOTICE '✅ Inserted 10 sample personalization rules';
    RAISE NOTICE '========================================================';
    RAISE NOTICE '🚀 Database is ready for personalized user experiences!';
    RAISE NOTICE '🔐 Face recognition integration ready with rekognition_id';
    RAISE NOTICE '🔑 Password-based auth ready (hackathon mode)';
    RAISE NOTICE '📊 Platform connections, recommendations, and insights tracking enabled';
END $$;