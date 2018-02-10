module.exports = {
	"parser": "babel-eslint",
	"extends": "airbnb",
	"globals": {
    "document": true,
    "fetch": true,
	},
	"rules": {
	  "import/no-extraneous-dependencies": [
		  "error",
		  {
		    "devDependencies": true
		  }
    ],
    "react/forbid-prop-types": [
      true, 
      { 
        "forbid": ['any'] 
      }
    ],
    "react/require-default-props": [false],
    "react/jsx-filename-extension": [
      true, 
      { 
        "extensions": [".js", ".jsx"] 
      }
    ],
    "jsx-a11y/anchor-is-valid": [ 
      "error", 
      {
        "components": [ "Link" ],
        "specialLink": [ "to" ]
      }
    ],
	}
};