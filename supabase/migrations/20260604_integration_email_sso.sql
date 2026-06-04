-- 업무앱 연동용 email_account_requests 보강 (선택 적용)
ALTER TABLE email_account_requests
  ADD COLUMN IF NOT EXISTS as_center_user_id integer,
  ADD COLUMN IF NOT EXISTS company_id integer,
  ADD COLUMN IF NOT EXISTS reviewer_email text;
