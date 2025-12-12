import cors from 'cors';

const allowedOrigins = [
  'https://muhammed-chi.vercel.app',
  'https://muhammed-chi.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

console.log('🚀 CORS Config Loaded. Allowing origins:', allowedOrigins);

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Authorization", "X-Total-Count"],
  maxAge: 86400,
  optionsSuccessStatus: 204
};

export default cors(corsOptions);