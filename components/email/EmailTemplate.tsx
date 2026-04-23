import * as React from "react";

interface EmailTemplateProps {
  message: string;
  userName: string;
}

export const EmailTemplate = ({
  message,
  userName,
}: EmailTemplateProps) => (
  <div style={{
    fontFamily: '"IBM Plex Sans Arabic", Arial, sans-serif',
    backgroundColor: "#fdfbf7",
    padding: "20px 10px",
    direction: "rtl",
    textAlign: "right",
    color: "#041f0f"
  }}>
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
    }}>
      {/* Header Section */}
      <div style={{
        background: "linear-gradient(135deg, rgba(171, 144, 11, 0.15) 0%, rgba(14, 88, 45, 0.1) 100%)",
        position: "relative",
        padding: "45px 20px",
        textAlign: "center",
        borderBottom: "3px solid #ab900b",
        overflow: "hidden",
      }}> 
        {/* Decorative Background Elements */}
        <div style={{
          position: "absolute",
          top: "-20px",
          right: "10px",
          fontSize: "120px",
          color: "#0e582d",
          opacity: 0.04,
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}>
          ❁
        </div>
        {/* Centered Logo */}
        <div style={{
          display: "inline-block",
          padding: "8px",
          backgroundColor: "#ffffff",
          borderRadius: "50%",
          boxShadow: "0 8px 20px rgba(14, 88, 45, 0.15)",
          marginBottom: "15px",
          position: "relative",
          zIndex: 1,
        }}>
          <img
            src="https://noor-alhuda-lyart.vercel.app/logo-share.png"
            alt="نور الهدى"
            width={65}
            height={65}
            style={{ 
              borderRadius: "50%", 
              display: "block",
            }}
          />
        </div>
        
        {/* Title and Subtitle */}
        <h1 style={{
          color: "#0e582d",
          margin: 0,
          fontSize: "30px",
          fontWeight: "bold",
          position: "relative",
          zIndex: 1,
          textShadow: "0 2px 4px rgba(0,0,0,0.05)"
        }}>نور الهدى</h1>
        <p style={{
          color: "#ab900b",
          margin: "8px 0 0 0",
          fontSize: "16px",
          fontWeight: "600",
          position: "relative",
          zIndex: 1,
        }}>
          رفيقك في رحلة الإيمان
        </p>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: "40px 35px" }}>
        <p style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "25px",
          color: "#0e582d"
        }}>أهلاً بك، {userName}</p>
        
        <div style={{
          lineHeight: "1.8",
          fontSize: "17px",
          color: "#041f0f",
          marginBottom: "35px",
          whiteSpace: "pre-line"
        }}>
          {message}
        </div>

        <div style={{
          backgroundColor: "#fcf9f2",
          borderRight: "5px solid #ab900b",
          padding: "20px",
          marginTop: "20px",
          fontStyle: "italic",
          fontSize: "15px",
          borderRadius: "4px",
          color: "#0e582d"
        }}>
          "نسأل الله أن يجعلنا وإياكم من الهداة المهتدين"
        </div>
      </div>

      {/* Footer Section */}
      <div style={{
        backgroundColor: "#f9fafb",
        padding: "25px 30px",
        textAlign: "center",
        borderTop: "1px solid #eeeeee"
      }}>
        <p style={{
          fontSize: "13px",
          color: "#6b7280",
          margin: "0 0 8px 0"
        }}>هذه الرسالة مرسلة من فريق عمل  نور الهدى</p>
        <p style={{
          fontSize: "12px",
          color: "#9ca3af",
          margin: 0
        }}>&copy; {new Date().getFullYear()} نور الهدى. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </div>
);
