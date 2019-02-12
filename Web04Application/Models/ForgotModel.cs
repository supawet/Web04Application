﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web04Application.Models
{
    public class Forgot
    {
        public string UnitHolder { get; set; }
        public string UserName { get; set; }
        public string Mobile_No { get; set; }
        public string Password { get; set; }
    }

    public class ForgotResponse
    {
        public string Message { get; set; }
        public string Status { get; set; }
    }
}