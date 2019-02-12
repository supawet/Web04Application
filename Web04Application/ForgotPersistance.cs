using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;

using Web04Application.Models;
using System.Configuration;

namespace Web04Application
{
    public class ForgotPersistance
    {
        public bool updateForgot(Forgot forgot)
        {

            OleDbConnection conn = null;
            OleDbCommand command = null;
            OleDbDataReader mySQLReader = null;

            ForgotResponse forgotRes = new ForgotResponse();

            try
            {
                /*
                conn.ConnectionString = myConnectionString;
                conn.Open();
                */
                //string myConnectionString = "Provider=SQLOLEDB;server=ALTIRON-ML;uid=bblamusr;pwd=@Bblampa55;database=bblam";
                string myConnectionString = "Provider=SQLOLEDB;server=192.9.200.41\\sqlexpress;uid=supawet;pwd=@Bblampa55;database=bblam";
                conn = new OleDbConnection(myConnectionString);

                conn.Open();

                command = new OleDbCommand();
                command.Connection = conn;
                command.CommandTimeout = 0;

                command.CommandType = CommandType.Text;
                command.CommandText = "update aspnet_Membership set Password = ? where UserId = (select USERID from aspnet_Users where LOWER(UserName) = ?)";
                command.Parameters.Clear();
                command.Parameters.AddWithValue("@Password", forgot.Password);
                command.Parameters.AddWithValue("@UserName", forgot.UserName.ToLower().Trim());
                command.ExecuteNonQuery();
                /*mySQLReader = command.ExecuteReader();

                while (mySQLReader.Read())
                {
                    forgotRes.Message = mySQLReader.GetValue(mySQLReader.GetOrdinal("FirstName")).Equals(DBNull.Value) ? null : mySQLReader.GetString(mySQLReader.GetOrdinal("FirstName"));
                }
                mySQLReader.Close();
                */

                //return fundPFArray;
            }
            catch (SqlException ex)
            {
                throw ex;
            }
            finally
            {
                if (mySQLReader != null)
                {
                    mySQLReader.Close();
                }
                if (conn != null)
                {
                    conn.Close();
                }
            }
            return true;
        }
    }
}