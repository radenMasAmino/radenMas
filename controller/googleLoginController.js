const { generateToken } = require('../helper/jwt')
const passport = require('../config/passport-setup')

class Controller{

    static authenticateGoogle(req,res){
        return passport.authenticate('google', { scope: ['profile', 'email'] })
    }

    static authentication(req,res,next){
        return passport.authenticate('google', { failureRedirect: '/failed' })
    }

    static callbackGoogle(req, res) {
        let token = generateToken(req.user[0].dataValues)
        res.redirect('http://backend.radenmasamino.org/sukses?token='+token);   
      
  }
  static authFailed (req, res) {
    req.json({ message:"anda gagal login"})
    }

    static authSukses (req, res) {
    req.json({ message: "selamat datang"})
    }

}


module.exports=Controller