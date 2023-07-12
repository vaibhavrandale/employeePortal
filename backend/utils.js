import jwt from 'jsonwebtoken';

export const generateToken = (employee) => {
  return jwt.sign(
    {
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      isAdmin: employee.isAdmin,
      activate: employee.activate,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '90d',
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
