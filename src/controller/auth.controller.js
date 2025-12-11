export const registerController = async (req, res, next) => {
  try {
    res.json("auth route are working");
  } catch (err) {
    next(err);
  }
};
