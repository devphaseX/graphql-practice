import jwt from 'jsonwebtoken';

const authenicate = async (req, res, next) => {
  const token = req.headers.authorization
    ?.split(/\s+/)
    .at(-1);

  if (!token) {
    res.json({
      token: '',
      error: {
        mesage: 'Attach a token to verify.',
      },
    });
  }

  try {
    const verifiedUser = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    req.verifiedUser = verifiedUser;

    next();
  } catch (e) {
    res.json({
      token: '',
      error: { message: 'Invalid token' },
    });
  }
};

export { authenicate };
