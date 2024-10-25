// Navbar component
function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

// Header component with breakpoint detection
function Header() {
    const [isNarrow, setIsNarrow] = React.useState(window.innerWidth < 777);

    React.useEffect(() => {
        function handleResize() {
            setIsNarrow(window.innerWidth < 777);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header>
            {isNarrow ? (
                <h1>Welcome 2 my simple React app</h1>
            ) : (
                <h1>Welcome to My Simple React App</h1>
            )}
        </header>
    );
}

// SummaryInfoItem component
function SummaryInfoItem({ digitalValue, labelValue }) {
    return (
        <div className="summary-info-item">
            <div className="digital-value">{digitalValue}</div>
            <div className="label-value">{labelValue}</div>
        </div>
    );
}

// SummaryInfo component with responsive layout
function SummaryInfo() {
    const [isNarrow, setIsNarrow] = React.useState(window.innerWidth < 777);

    React.useEffect(() => {
        function handleResize() {
            setIsNarrow(window.innerWidth < 777);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`summary-info ${isNarrow ? 'vertical' : 'horizontal'}`}>
            <SummaryInfoItem digitalValue="3" labelValue="clean-ups" />
            <SummaryInfoItem digitalValue="1054kg" labelValue="waste collected" />
            <SummaryInfoItem digitalValue="1" labelValue="country" />
        </div>
    );
}

// SummarySection component
function SummarySection() {
    return (
        <section className="summary">
            <h2 className="summary_header">Summary</h2>
            <SummaryInfo />
            <p>This is a brief summary of our application's impact.</p>
        </section>
    );
}

// Main section component
function MainSection() {
    return (
        <section className="main">
            <h2>Main Content</h2>
            <p>This is the main content of our application.</p>
        </section>
    );
}

// Footer section component
function FooterSection() {
    return (
        <footer>
            <p>&copy; 2023 My Simple React App. All rights reserved.</p>
        </footer>
    );
}

// Main App component
function App() {
    return (
        <div className="app">
            <Navbar />
            <div className="content-wrapper">
                <Header />
                <SummarySection />
                <MainSection />
            </div>
            <FooterSection />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));