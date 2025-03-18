const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const productController = require('../controller/productController');
const manageuserController=require('../controller/manageuserController');
const pageController=require('../controller/pageController');
const orderController = require('../controller/orderController');
const isAdminLoggedIn = (req, res, next) => {
  if (req.session.isAdminLoggedIn) {
    return next();
  } else {
    return res.redirect('/adminlogin');
  }
};

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });
router.get('/addcategory', isAdminLoggedIn, categoryController.getAddCategory);
router.post('/addcategory', upload.single('categoryImage'), categoryController.postAddCategory);
router.get('/managecategory', isAdminLoggedIn, categoryController.getcategory);
router.delete('/managecategory/:categoryId', isAdminLoggedIn, categoryController.managecategory);
router.get('/addproduct', isAdminLoggedIn, productController.getAddProduct);
router.post('/addproduct', upload.single('productImage'), productController.postAddProduct);
router.get('/modifyproduct', isAdminLoggedIn, productController.getModifyProduct);
router.put('/updateproduct/:productId', productController.updateProduct);
router.delete('/deleteproduct/:productId', productController.deleteproduct);
 router.get('/managestock', isAdminLoggedIn, productController.getmanagestock);
 router.put('/managestock/:productId', productController.managestock);
router.get('/manageuser', isAdminLoggedIn, manageuserController.getmanageuser);
router.delete('/deleteuser/:userId', manageuserController.deleteUser);
router.get('/trackuserhistory', isAdminLoggedIn, manageuserController.gettrackuserhistory);
router.get('/feedbackhistory', isAdminLoggedIn, manageuserController.getuserfeedback);
router.get('/aboutus', isAdminLoggedIn, pageController.getaboutus);
router.post('/aboutus', isAdminLoggedIn, pageController.updateaboutus);
router.get('/userqueries', isAdminLoggedIn, pageController.getcontactus);
router.get('/vieworder', isAdminLoggedIn, orderController.getmanageorders);
router.put('/managestatus/:orderId', orderController.updateorderstatus);




module.exports = router;
