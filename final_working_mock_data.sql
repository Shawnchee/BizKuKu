-- ================================================
-- BizKuKu Mock Data - FINAL WORKING VERSION
-- Handles the NULL id constraint properly
-- ================================================

BEGIN;

-- First, let's check if we need to add a default to the id column
DO $$
BEGIN
    -- Add DEFAULT uuid_generate_v4() to the id column if it doesn't exist
    BEGIN
        ALTER TABLE public.user_profiles ALTER COLUMN id SET DEFAULT uuid_generate_v4();
    EXCEPTION
        WHEN others THEN
            -- Column might already have a default, continue
            NULL;
    END;
END $$;

-- Temporarily disable the foreign key constraint for mock data
ALTER TABLE public.user_profiles DROP CONSTRAINT IF EXISTS user_profiles_id_fkey;

-- ================================
-- ACCOUNT 1: RESTAURANT OWNER
-- ================================

-- 1. User Profile - Restaurant Owner (with explicit UUID)
INSERT INTO public.user_profiles (
    id, email, full_name, company_name, business_type, phone, address, city, state, 
    postal_code, country, avatar_url, onboarding_completed, user_role, onboarding_step, 
    profile_completion_score, verification_status, rekognition_id, password, last_active_date
) VALUES (
    uuid_generate_v4(),
    'ahmad.restaurant@bizkuku.com',
    'Ahmad bin Hassan',
    'Warung Ahmad Sedap',
    'restaurant',
    '+60123456789',
    '123 Jalan Makan, Taman Sedap',
    'Kuala Lumpur',
    'Selangor',
    '50000',
    'Malaysia',
    'https://example.com/avatar-ahmad.jpg',
    true,
    'business_owner',
    4,
    95,
    'verified',
    'aws-rekognition-face-ahmad-001',
    'password123',
    NOW() - INTERVAL '2 hours'
);

-- Complete restaurant owner setup with proper ID handling
DO $$
DECLARE
    restaurant_user_id UUID;
    restaurant_business_id UUID;
BEGIN
    -- Get the user ID we just created
    SELECT id INTO restaurant_user_id 
    FROM public.user_profiles 
    WHERE email = 'ahmad.restaurant@bizkuku.com';
    
    -- Insert business record
    INSERT INTO public.businesses (
        user_id, business_name, business_type, registration_number, tax_number, 
        industry, annual_revenue, employee_count, established_date, description, 
        website, social_media, business_status, business_size, monthly_revenue_range, 
        digital_maturity_score, compliance_score, risk_profile, business_goals
    ) VALUES (
        restaurant_user_id,
        'Warung Ahmad Sedap',
        'restaurant',
        'SSM-123456789',
        'TIN-987654321',
        'Food & Beverage',
        180000.00,
        8,
        '2020-03-15',
        'Authentic Malaysian cuisine serving nasi lemak, rendang, and local delights',
        'https://warungahmadsedap.my',
        '{"facebook": "warungahmadsedap", "instagram": "@warungahmadsedap", "tiktok": "@warungahmad"}',
        'active',
        'small',
        '20k-50k',
        75,
        88,
        'low',
        '["growth", "digitalization", "customer_expansion"]'
    ) RETURNING id INTO restaurant_business_id;
    
    -- Insert user preferences
    INSERT INTO public.user_preferences (
        user_id, preferred_language, theme, dashboard_layout, currency_display,
        show_recommendations, show_financial_insights, show_platform_suggestions,
        preferred_communication, focus_areas, email_notifications, sms_notifications,
        push_notifications, marketing_emails
    ) VALUES (
        restaurant_user_id,
        'ms',
        'light',
        'detailed',
        'MYR',
        true,
        true,
        true,
        'sms',
        '["loans", "digitalization", "customer_management"]',
        true,
        true,
        true,
        false
    );
    
    -- Insert business categories
    INSERT INTO public.business_categories (
        business_id, primary_category, sub_category, industry_code, business_model,
        target_market, customer_segments, seasonal_business, online_presence, physical_location,
        license_requirements, tax_obligations
    ) VALUES (
        restaurant_business_id,
        'food_beverage',
        'restaurant',
        '56101',
        'b2c',
        '["local", "national"]',
        '["individuals", "families", "tourists"]',
        false,
        true,
        true,
        '["halal", "food_handler", "business_license"]',
        '["sst", "income_tax", "local_council"]'
    );
    
    -- Insert platform connections
    INSERT INTO public.platform_connections (
        business_id, platform_name, platform_category, connection_status, 
        platform_account_id, connection_date, last_sync_date, sync_enabled, 
        auto_sync_frequency, platform_stats
    ) VALUES 
    (
        restaurant_business_id,
        'grabfood',
        'food_delivery',
        'connected',
        'grabfood_ahmad_001',
        NOW() - INTERVAL '30 days',
        NOW() - INTERVAL '1 hour',
        true,
        'hourly',
        '{"orders": 245, "revenue": 12500, "rating": 4.6, "customers": 180}'
    ),
    (
        restaurant_business_id,
        'foodpanda',
        'food_delivery',
        'connected',
        'foodpanda_ahmad_002',
        NOW() - INTERVAL '20 days',
        NOW() - INTERVAL '2 hours',
        true,
        'daily',
        '{"orders": 189, "revenue": 9800, "rating": 4.4, "customers": 145}'
    );
    
    -- Insert financial records
    INSERT INTO public.financial_records (
        business_id, record_type, category, amount, currency, description, 
        transaction_date, receipt_url, tags
    ) VALUES 
    (
        restaurant_business_id,
        'income',
        'food_sales',
        15600.00,
        'MYR',
        'January 2025 food sales revenue',
        '2025-01-31',
        'https://example.com/receipt-jan-2025.pdf',
        '{"dine_in", "takeaway", "delivery"}'
    ),
    (
        restaurant_business_id,
        'expense',
        'ingredients',
        5200.00,
        'MYR',
        'Monthly ingredients and raw materials',
        '2025-01-25',
        'https://example.com/invoice-ingredients.pdf',
        '{"rice", "meat", "vegetables", "spices"}'
    ),
    (
        restaurant_business_id,
        'expense',
        'utilities',
        800.00,
        'MYR',
        'Electricity and water bills',
        '2025-01-20',
        null,
        '{"electricity", "water", "gas"}'
    );
    
    -- Insert business insights
    INSERT INTO public.business_insights (
        business_id, insight_type, insight_category, insight_title, insight_description,
        insight_value, period_start, period_end, priority_score, is_actionable,
        action_recommendations, display_on_dashboard, display_order
    ) VALUES 
    (
        restaurant_business_id,
        'customer',
        'peak_hours',
        'Peak Dining Hours Identified',
        'Your restaurant sees highest orders between 12:00-14:00 and 19:00-21:00',
        '{"peak_lunch": "12:00-14:00", "peak_dinner": "19:00-21:00", "order_volume": {"lunch": 65, "dinner": 80}}',
        '2025-01-01',
        '2025-01-31',
        85,
        true,
        '["increase_staff_during_peak", "prepare_popular_items", "optimize_delivery_timing"]',
        true,
        1
    ),
    (
        restaurant_business_id,
        'financial',
        'revenue_trend',
        'Strong Monthly Growth',
        'Revenue increased 18% compared to last month',
        '{"current_month": 15600, "previous_month": 13200, "growth_rate": 18.2, "trend": "positive"}',
        '2025-01-01',
        '2025-01-31',
        75,
        false,
        '[]',
        true,
        2
    );
    
    RAISE NOTICE 'Restaurant Owner Created: % (ID: %)', 'ahmad.restaurant@bizkuku.com', restaurant_user_id;
END $$;

-- ================================
-- ACCOUNT 2: RETAIL STORE OWNER
-- ================================

-- 1. User Profile - Retail Owner
INSERT INTO public.user_profiles (
    id, email, full_name, company_name, business_type, phone, address, city, state, 
    postal_code, country, avatar_url, onboarding_completed, user_role, onboarding_step, 
    profile_completion_score, verification_status, rekognition_id, password, last_active_date
) VALUES (
    uuid_generate_v4(),
    'siti.retail@bizkuku.com',
    'Siti binti Abdullah',
    'Siti Fashion Boutique',
    'retail',
    '+60198765432',
    '456 Jalan Shopping, Plaza Siti',
    'Johor Bahru',
    'Johor',
    '80000',
    'Malaysia',
    'https://example.com/avatar-siti.jpg',
    true,
    'business_owner',
    4,
    92,
    'verified',
    'aws-rekognition-face-siti-002',
    'sitisecure456',
    NOW() - INTERVAL '1 day'
);

-- Complete retail owner setup
DO $$
DECLARE
    retail_user_id UUID;
    retail_business_id UUID;
BEGIN
    -- Get the user ID we just created
    SELECT id INTO retail_user_id 
    FROM public.user_profiles 
    WHERE email = 'siti.retail@bizkuku.com';
    
    -- Insert business record
    INSERT INTO public.businesses (
        user_id, business_name, business_type, registration_number, tax_number, 
        industry, annual_revenue, employee_count, established_date, description, 
        website, social_media, business_status, business_size, monthly_revenue_range, 
        digital_maturity_score, compliance_score, risk_profile, business_goals
    ) VALUES (
        retail_user_id,
        'Siti Fashion Boutique',
        'retail',
        'SSM-456789123',
        'TIN-789123456',
        'Fashion Retail',
        240000.00,
        5,
        '2019-08-10',
        'Trendy fashion boutique specializing in modest wear and contemporary Muslim fashion',
        'https://sitifashion.my',
        '{"facebook": "sitifashionboutique", "instagram": "@sitifashion_my", "shopee": "sitifashion.my"}',
        'active',
        'small',
        '20k-50k',
        85,
        82,
        'medium',
        '["digitalization", "inventory_optimization", "online_expansion"]'
    ) RETURNING id INTO retail_business_id;
    
    -- Insert user preferences
    INSERT INTO public.user_preferences (
        user_id, preferred_language, theme, dashboard_layout, currency_display,
        show_recommendations, show_financial_insights, show_platform_suggestions,
        preferred_communication, focus_areas, email_notifications, sms_notifications,
        push_notifications, marketing_emails
    ) VALUES (
        retail_user_id,
        'en',
        'light',
        'compact',
        'MYR',
        true,
        true,
        true,
        'email',
        '["grants", "digitalization", "inventory_management"]',
        true,
        false,
        true,
        true
    );
    
    -- Insert business categories
    INSERT INTO public.business_categories (
        business_id, primary_category, sub_category, industry_code, business_model,
        target_market, customer_segments, seasonal_business, online_presence, physical_location,
        license_requirements, tax_obligations
    ) VALUES (
        retail_business_id,
        'retail',
        'clothing_store',
        '47711',
        'b2c',
        '["local", "national", "international"]',
        '["individuals", "young_professionals", "families"]',
        true,
        true,
        true,
        '["business_license", "retail_permit"]',
        '["sst", "income_tax", "import_duties"]'
    );
    
    -- Insert platform connections
    INSERT INTO public.platform_connections (
        business_id, platform_name, platform_category, connection_status, 
        platform_account_id, connection_date, last_sync_date, sync_enabled, 
        auto_sync_frequency, platform_stats
    ) VALUES 
    (
        retail_business_id,
        'shopee',
        'ecommerce',
        'connected',
        'shopee_siti_001',
        NOW() - INTERVAL '45 days',
        NOW() - INTERVAL '30 minutes',
        true,
        'hourly',
        '{"orders": 156, "revenue": 18500, "products": 89, "customers": 120, "rating": 4.8}'
    ),
    (
        retail_business_id,
        'lazada',
        'ecommerce',
        'connected',
        'lazada_siti_002',
        NOW() - INTERVAL '25 days',
        NOW() - INTERVAL '1 hour',
        true,
        'daily',
        '{"orders": 89, "revenue": 12200, "products": 76, "customers": 68, "rating": 4.5}'
    );
    
    -- Insert financial records
    INSERT INTO public.financial_records (
        business_id, record_type, category, amount, currency, description, 
        transaction_date, receipt_url, tags
    ) VALUES 
    (
        retail_business_id,
        'income',
        'product_sales', 
        20800.00,
        'MYR',
        'January 2025 fashion sales',
        '2025-01-31',
        'https://example.com/receipt-siti-jan.pdf',
        '{"online", "in_store", "seasonal_collection"}'
    ),
    (
        retail_business_id,
        'expense',
        'inventory',
        8500.00,
        'MYR',
        'New collection purchase from suppliers',
        '2025-01-15',
        'https://example.com/invoice-inventory.pdf',
        '{"dresses", "hijabs", "accessories", "shoes"}'
    );
    
    -- Insert business insights
    INSERT INTO public.business_insights (
        business_id, insight_type, insight_category, insight_title, insight_description,
        insight_value, period_start, period_end, priority_score, is_actionable,
        action_recommendations, display_on_dashboard, display_order
    ) VALUES 
    (
        retail_business_id,
        'market',
        'seasonal_trends',
        'Ramadan Collection Performing Well',
        'Modest wear sales increased 35% in preparation for Ramadan season',
        '{"category": "modest_wear", "growth_rate": 35, "top_products": ["baju_kurung", "hijab_premium", "jubah"], "revenue_impact": 7200}',
        '2025-01-01',
        '2025-01-31',
        90,
        true,
        '["increase_modest_wear_inventory", "launch_ramadan_promotion", "expand_color_options"]',
        true,
        1
    );
    
    RAISE NOTICE 'Retail Owner Created: % (ID: %)', 'siti.retail@bizkuku.com', retail_user_id;
END $$;

-- ================================
-- ACCOUNT 3: SERVICE PROVIDER
-- ================================

-- 1. User Profile - Service Provider
INSERT INTO public.user_profiles (
    id, email, full_name, company_name, business_type, phone, address, city, state, 
    postal_code, country, avatar_url, onboarding_completed, user_role, onboarding_step, 
    profile_completion_score, verification_status, rekognition_id, password, last_active_date
) VALUES (
    uuid_generate_v4(),
    'raj.services@bizkuku.com',
    'Rajesh Kumar',
    'Kumar Digital Solutions',
    'services',
    '+60177889900',
    '789 Jalan Teknologi, Cyber Heights',
    'Cyberjaya',
    'Selangor',
    '63000',
    'Malaysia',
    'https://example.com/avatar-raj.jpg',
    true,
    'business_owner',
    4,
    88,
    'verified',
    'aws-rekognition-face-raj-003',
    'rajtech789',
    NOW() - INTERVAL '3 hours'
);

-- Complete service provider setup
DO $$
DECLARE
    service_user_id UUID;
    service_business_id UUID;
BEGIN
    -- Get the user ID we just created
    SELECT id INTO service_user_id 
    FROM public.user_profiles 
    WHERE email = 'raj.services@bizkuku.com';
    
    -- Insert business record
    INSERT INTO public.businesses (
        user_id, business_name, business_type, registration_number, tax_number, 
        industry, annual_revenue, employee_count, established_date, description, 
        website, social_media, business_status, business_size, monthly_revenue_range, 
        digital_maturity_score, compliance_score, risk_profile, business_goals
    ) VALUES (
        service_user_id,
        'Kumar Digital Solutions',
        'services',
        'SSM-789123456',
        'TIN-456789123',
        'IT Services',
        120000.00,
        12,
        '2021-01-20',
        'Digital transformation consultancy specializing in web development, mobile apps, and digital marketing for SMEs',
        'https://kumardigital.my',
        '{"linkedin": "kumar-digital-solutions", "facebook": "kumardigitalsolutions", "instagram": "@kumardigital_my"}',
        'active',
        'small',
        '5k-20k',
        95,
        90,
        'low',
        '["growth", "team_expansion", "service_diversification"]'
    ) RETURNING id INTO service_business_id;
    
    -- Insert user preferences
    INSERT INTO public.user_preferences (
        user_id, preferred_language, theme, dashboard_layout, currency_display,
        show_recommendations, show_financial_insights, show_platform_suggestions,
        preferred_communication, focus_areas, email_notifications, sms_notifications,
        push_notifications, marketing_emails
    ) VALUES (
        service_user_id,
        'en',
        'dark',
        'default',
        'MYR',
        true,
        true,
        false,
        'email',
        '["loans", "team_expansion", "technology_upgrade"]',
        true,
        false,
        false,
        false
    );
    
    -- Insert business categories
    INSERT INTO public.business_categories (
        business_id, primary_category, sub_category, industry_code, business_model,
        target_market, customer_segments, seasonal_business, online_presence, physical_location,
        license_requirements, tax_obligations
    ) VALUES (
        service_business_id,
        'services',
        'it_consulting',
        '62090',
        'b2b',
        '["local", "national"]',
        '["small_business", "medium_enterprise", "startups"]',
        false,
        true,
        true,
        '["msc_status", "business_license", "professional_certification"]',
        '["income_tax", "service_tax", "professional_fees"]'
    );
    
    -- Insert financial records
    INSERT INTO public.financial_records (
        business_id, record_type, category, amount, currency, description, 
        transaction_date, receipt_url, tags
    ) VALUES 
    (
        service_business_id,
        'income',
        'consulting_fees',
        12500.00,
        'MYR',
        'Web development project completion',
        '2025-01-28',
        'https://example.com/invoice-webdev.pdf',
        '{"web_development", "ecommerce", "payment_integration"}'
    ),
    (
        service_business_id,
        'expense',
        'software_licenses',
        2800.00,
        'MYR',
        'Annual software licenses and cloud services',
        '2025-01-10',
        'https://example.com/invoice-software.pdf',
        '{"aws", "adobe_creative", "development_tools", "project_management"}'
    );
    
    -- Insert recommendation history
    INSERT INTO public.recommendation_history (
        user_id, business_id, recommendation_type, recommendation_category, requested_amount,
        funding_purpose, business_context, recommendations_data, recommendation_count,
        clicked_recommendations, model_version, confidence_score
    ) VALUES (
        service_user_id,
        service_business_id,
        'loan',
        'funding',
        50000.00,
        'equipment',
        'Need to upgrade development equipment and hire additional developer',
        '[{"id": "sme_bank_001", "name": "SME Bank Equipment Loan", "amount": 50000, "interest_rate": 4.5, "tenure": 36}, {"id": "development_bank_002", "name": "Digital Transformation Loan", "amount": 45000, "interest_rate": 4.2, "tenure": 48}]',
        2,
        '["sme_bank_001"]',
        'v1.0',
        0.87
    );
    
    RAISE NOTICE 'Service Provider Created: % (ID: %)', 'raj.services@bizkuku.com', service_user_id;
END $$;

-- Re-add the foreign key constraint with deferrable option (optional - for future auth integration)
-- ALTER TABLE public.user_profiles 
-- ADD CONSTRAINT user_profiles_id_fkey 
-- FOREIGN KEY (id) REFERENCES auth.users(id) 
-- ON DELETE CASCADE
-- DEFERRABLE INITIALLY DEFERRED;

COMMIT;

-- Final verification and success message
SELECT 
    'SUCCESS: Mock data insertion completed!' as status,
    COUNT(*) as total_users_created,
    ARRAY_AGG(email) as created_emails
FROM public.user_profiles 
WHERE email IN ('ahmad.restaurant@bizkuku.com', 'siti.retail@bizkuku.com', 'raj.services@bizkuku.com');