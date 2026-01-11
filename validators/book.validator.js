const { body, validationResult, param} = require("express-validator")

const createBookValidation = [
      body("bookName")
      .notEmpty().withMessage("Book name is required.")
      .isLength({min:5, max:100}).withMessage("Book name must be between 5 to 100 characters."),

      body("price")
      .notEmpty().withMessage("price is required.")
      .isFloat({min:1, max:1000}).withMessage("price must be between 1 and 1000"),
      
      body("countInStock")
      .notEmpty().withMessage("Price is required.")
      .isInt({min:1, max:255}).withMessage("Stock count must be between 1 and 255"),

      body("image")
      .notEmpty().withMessage("Image URL is required")
      .isURL().withMessage("Image must be a valid URL")

    ];


    const updateBookValidation = [
        
        
        body("bookName")
          .optional()
          .isLength({min:5, max:100}).withMessage("Book name must be between 5 to 100 characters."),
    
          body("price")
          .optional()
          .isFloat({min:1, max:1000}).withMessage("price must be between 1 and 1000"),
          
          body("countInStock")
          .optional()
          .isInt({min:1, max:255}).withMessage("Stock count must be between 1 and 255"),
    
          body("image")
          .optional()
          .isURL().withMessage("Image must be a valid URL")
    
        ];

        const idValidation = [param("id").isMongoId().withMessage("Invalid book Id")]

        const handleValidationError = (req, res, next) => {
             const errors = validationResult(req)  
                
                if(!errors.isEmpty()){
                    return res.status(400).json({errors: errors.array()})
        }
        next()
    }

    module.exports={
        createBookValidation,
        updateBookValidation,
        idValidation,
        handleValidationError
    }
 
