-- 직원 @sncpc.com 사서함 IMAP 인증 (Zoho 앱 비밀번호 등)
CREATE TABLE IF NOT EXISTS staff_mailbox_credentials (
    email text PRIMARY KEY,
    imap_secret text NOT NULL,
    updated_by text,
    updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE staff_mailbox_credentials IS '직원 사내메일 Zoho IMAP 암호화 저장 (발급완료 시 또는 직원 1회 등록)';
