# Auto-Updating Flask Webserver

This project is an auto-updating Flask webserver designed to streamline the deployment and development process. It is compatible with Debian/Ubuntu for production and Windows for development purposes.

## Features
- Automatically updates itself with the latest changes from the repository.
- Designed for easy deployment and development.
- Supports a branching workflow for better version control.

## Setup Instructions

### Prerequisites
1. Ensure you have Python 3.x installed on your system.
2. Install `pip` (Python package manager) if not already installed.
3. For production, use a Debian/Ubuntu-based system. For development, use Windows.

### Repository Setup
1. **Fork the Repository**  
    Start by forking this repository to create your own version for your webserver. This allows you to customize and manage your own updates.

2. **Clone the Repository**  
    Clone your forked repository to your local machine:
    ```bash
    git clone https://github.com/<your-username>/Auto-Updateable-Flask-webserver.git
    cd Auto-Updateable-Flask-webserver
    ```

3. **Branching Workflow**  
    Use a two-branch workflow:
    - `main`: For production-ready code.
    - `dev`: For development and testing new features.

    Create the `dev` branch if it doesn't already exist:
    ```bash
    git checkout -b dev
    ```

### Installation
1. **Install Dependencies**  
    Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

2. **Environment Configuration**  
    Configure the .env with your variables. (Note: Remember to add the .env to the .gitignore file)

3. **Run the Application**  
    Start the Flask webserver:
    run the start.bat in `/src/backend/start/start.bat`

### Deployment

To deploy the auto-updating Flask webserver in a production environment, follow these steps:

1. **Use a Debian/Ubuntu Server**  
    Ensure that you have a production server is running a Debian or Ubuntu-based operating system.

2. **Configure `systemd` for Automatic Startup**  
    Use the provided `autowebserver.service` template located in `/src/autowebserver.service` to configure `systemd`. This will ensure that the webserver starts automatically on system boot.  
    - Copy the service file to the `/etc/systemd/system/` directory:
      ```bash
      sudo cp /src/autowebserver.service /etc/systemd/system/
      ```
    - Reload the `systemd` daemon to recognize the new service:
      ```bash
      sudo systemctl daemon-reload
      ```
    - Enable and start the service:
      ```bash
      sudo systemctl enable autowebserver
      sudo systemctl start autowebserver
      ```

3. **Set Up a Reverse Proxy**  
    Configure a reverse proxy to handle incoming HTTP/HTTPS requests and forward them to the Flask webserver. You can use tools like Nginx or a Cloudflare Tunnel for this purpose.  
    - For Nginx, create a configuration file for your domain and set it to forward requests to the Flask server's port (e.g., `http://127.0.0.1:5000`).  
    - For Cloudflare Tunnel, follow their documentation to create a secure tunnel to your server.

4. **Configure a GitHub Webhook for Automatic Updates**  
    Set up a GitHub webhook to trigger the webserver's update mechanism whenever changes are pushed to the repository.  
    - Go to your repository on GitHub and navigate to **Settings > Webhooks**.  
    - Click **Add webhook** and set the following:  
      - **Payload URL**: `https://<your_domain>/webhook`  
      - **Content type**: `application/x-www-form-urlencoded`  
      - **Secret**: Use a secure secret key and configure it in your `.env` file.  
    - Select the events you want to trigger the webhook (e.g., `Push events`).  
    - Save the webhook configuration.

By following these steps, your Flask webserver will be ready for production deployment with automatic updates and robust request handling.

## Files to configure
* `src/update.sh`
* `src/start/start.sh`
* `.env`
* `.gitignore`

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
