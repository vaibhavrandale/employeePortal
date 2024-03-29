import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';
export const generateToken = (employee) => {
  return jwt.sign(
    {
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      isAdmin: employee.isAdmin,
      isSuperAdmin: employee.isSuperAdmin,
      isSales: employee.isSales,
      isScm: employee.isScm,
      isDesign: employee.isDesign,
      isProject: employee.isProject,
      isVisitor: employee.isVisitor,
      isProduction: employee.isProduction,
      activate: employee.activate,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '10d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer XXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.employee = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.employee && req.employee.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isSuperAdmin = (req, res, next) => {
  if (req.employee && req.employee.isSuperAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isSales = (req, res, next) => {
  if (req.employee && req.employee.isSales) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isScm = (req, res, next) => {
  if (req.employee && req.employee.isScm) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
export const isDesign = (req, res, next) => {
  if (req.employee && req.employee.isDesign) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isProject = (req, res, next) => {
  if (req.employee && req.employee.isProject) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isVisitor = (req, res, next) => {
  if (req.employee && req.employee.isVisitor) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const isProduction = (req, res, next) => {
  if (req.employee && req.employee.isProduction) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

export const baseUrl = () =>
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://employee.taypro.in';
