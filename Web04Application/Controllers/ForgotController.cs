using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Web04Application.Models;

namespace Web04Application.Controllers
{
    //[EnableCors("CorsPolicy")]

    public class ForgotController : Controller
    {
        //[DisableCors]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        //[EnableCors(origins: "http://bblamapiauthen.azurewebsites.net", headers: "*", methods: "*")]
        // GET: /<controller>/

        // GET: Forgot
        public ActionResult Index()
        {
            return View("~/Views/Forgot/index.cshtml");
        }

    public ActionResult forgot_success()
    //public string Index()
    {
        //return "This is my default action...";
        return View("~/Views/Forgot/forgot_success.cshtml");
    }

    public ActionResult forgot_fail()
    //public string Index()
    {
        //return "This is my default action...";
        return View("~/Views/Forgot/forgot_fail.cshtml");
    }

    [HttpPost]
    public ActionResult update(string username,string password)
    {
        Forgot forgot = new Forgot();
        forgot.UserName = username;
        forgot.Password = password;

        //update database here..

        ForgotPersistance fg = new ForgotPersistance();
        if (!fg.updateForgot(forgot))
        {
            return RedirectToAction("forgot_fail");
        }
        else
        {
            return RedirectToAction("forgot_success");
        }
    }
}
}