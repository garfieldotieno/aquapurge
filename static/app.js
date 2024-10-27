// Navbar component
function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="static/aquapurge_logo.png" alt="Logo" className="logo" />
            </div>
            <div className="navbar-donate">
                <button className="donate-btn">Donate</button>
            </div>
        </nav>
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
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);

    return (
        <section className="summary">
            <h3 className="centerdH2">Total Impact</h3>
            <h5 className="centerdH2">{formattedDate}</h5>
            <SummaryInfo />
        </section>
    );
}



// OrgCard component with "More" button
function OrgCard({ name, description, thumbnailUrl, nextCleanupDate }) {
    return (
        <div className="org-card">
            <div className="org-card-content">
                <div className="org-card-text">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p className="next-cleanup">
                        Next clean up: <strong>{nextCleanupDate}</strong>
                    </p>
                </div>
                <div className="org-card-thumbnail">
                    <img src={thumbnailUrl} alt={`${name} thumbnail`} />
                </div>
            </div>
            <div className="org-card-button-container">
                <button className="more-btn">More</button>
            </div>
        </div>
    );
}


// OrgContainer component with responsive layout
function OrgContainer() {
    const [isNarrow, setIsNarrow] = React.useState(window.innerWidth < 777);

    React.useEffect(() => {
        function handleResize() {
            setIsNarrow(window.innerWidth < 777);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className={`org-container ${isNarrow ? 'vertical' : 'horizontal'}`}>
            <OrgCard 
                name="Org 1" 
                description="Description for Org 1" 
                thumbnailUrl="static/logo1.jpeg"
                nextCleanupDate="April 20, 2023"
            />
            <OrgCard 
                name="Org 2" 
                description="Description for Org 2" 
                thumbnailUrl="static/logo2.jpeg"
                nextCleanupDate="May 5, 2023"
            />
            <OrgCard 
                name="Org 3" 
                description="Description for Org 3" 
                thumbnailUrl="static/logo3.jpeg"
                nextCleanupDate="May 15, 2023"
            />
            <OrgCard 
                name="Org 4" 
                description="Description for Org 4" 
                thumbnailUrl="static/logo4.jpeg"
                nextCleanupDate="May 25, 2023"
            />
        </div>
    );
}

// Main section component
function MainSection() {
    return (
        <section className="main">
            <h2 className="centerdH2">Organizations</h2>
            <OrgContainer />
        </section>
    );
}

// Footer section component
function FooterSection() {
    return (
        <footer>
            <p>&copy; 2024</p>
        </footer>
    );
}


// Main App component
function App() {
    return (
        <div className="app">
            <Navbar />
            <div className="content-wrapper">
                <SummarySection />
                <MainSection />
            </div>
            <FooterSection />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));
