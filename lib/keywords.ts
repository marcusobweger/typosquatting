const SUSPICIOUS_KEYWORDS = {
    security: [
        'secure',
        'account',
        'login',
        'signin',
        'verify',
        'verification',
        'auth',
        'authenticate',
        'confirm',
        'update',
        'password',
        'unlock',
    ],

    urgency: [
        'urgent',
        'alert',
        'suspended',
        'limited',
        'restriction',
        'blocked',
        'expire',
        'notice',
        'immediate',
        'action',
    ],

    finance: [
        'billing',
        'invoice',
        'payment',
        'refund',
        'wallet',
        'crypto',
        'bank',
        'pay',
        'transaction',
        'balance',
        'statement',
    ],

    services: [
        'support',
        'service',
        'help',
        'customer',
        'client',
        'portal',
        'admin',
        'ticket',
        'delivery',
        'shipping',
    ],

    prefixes: ['my', 'get', 'go', 'free', 'online', 'drive', 'cloud'],
};

export const PHISHING_KEYWORDS = [
    ...SUSPICIOUS_KEYWORDS.security,
    ...SUSPICIOUS_KEYWORDS.urgency,
    ...SUSPICIOUS_KEYWORDS.finance,
    ...SUSPICIOUS_KEYWORDS.services,
    ...SUSPICIOUS_KEYWORDS.prefixes,
];
