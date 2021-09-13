using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessage(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        private string GetDefaultMessage(int statusCode)
        {
            return StatusCode switch
            {
                400 => "Yo man, it was probably your fault",
                401 => "Authenticate yourself bruv",
                404 => "This is not the request you were looking for",
                500 => "Some shit went wrong, oh well... be grateful I told you.",
                _ => null
            };

        }

    }
}
