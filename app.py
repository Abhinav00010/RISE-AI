from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "rise-ai-ibm-watsonx-2024")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        subject = request.form.get("subject", "").strip()
        message = request.form.get("message", "").strip()
        # In production, integrate email service (SendGrid, SMTP, etc.)
        return jsonify({
            "status": "success",
            "message": f"Thank you, {name}. Your message has been received."
        })
    return render_template("contact.html")


@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404


@app.errorhandler(500)
def server_error(e):
    return render_template("500.html"), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)
