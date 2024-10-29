# AquaPurge

AquaPurge is a web application dedicated to environmental conservation efforts, focusing on ocean and river cleanup initiatives. The application provides information about various organizations, their missions, upcoming cleanup events, and ways to contribute through donations and NFTs.

## Features

- **Organization Overview**: Displays a list of organizations involved in environmental cleanup efforts.
- **Detailed Information**: Provides detailed information about each organization, including their mission, impact, upcoming events, and team members.
- **Image Gallery**: Showcases images from past events and initiatives.
- **Responsive Design**: The application is designed to be responsive and user-friendly on various devices.
- **Mock Data**: Uses a JSON file to simulate backend data for development and testing.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **json-server**: A simple way to create a RESTful API using a JSON file.
- **Splide.js**: A lightweight slider for displaying image galleries.
- **HTML/CSS**: For structuring and styling the application.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/aquapurge.git
   cd aquapurge
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:

   To start both the React application and the json-server, use:

   ```bash
   npm start
   ```

   This command will start the React app on `http://localhost:8080` and the json-server on `http://localhost:3000`.

## Usage

- Navigate to `http://localhost:8080` in your web browser to view the application.
- The main page displays a summary of the organizations and their impact.
- Click on an organization to view detailed information, including upcoming cleanup events and a gallery of images.
- Use the "Donate" button to support the organizations.

## Mock Data Structure

The application uses a `mock.json` file located in the `static` directory to simulate backend data. The structure of the JSON file is as follows:


## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the contributors and the open-source community for their support and resources.