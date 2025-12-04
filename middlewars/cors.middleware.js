import cors from 'cors'

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? JSON.parse(process.env.ALLOWED_ORIGINS)
  : ['http://localhost:3000', 'http://localhost:5173'];

const corsOptions = {
  origin: function (origin, cb) {
    if (!origin) return cb(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      return cb(null, true);
    } else {
      console.warn(`CORS Blocked: ${origin}`);
      return cb(new Error(`CORS policy: ${origin} not allowed`), false);
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Authorization", "X-Total-Count"],
  maxAge: 86400,
  optionsSuccessStatus: 200
};

export default cors(corsOptions);