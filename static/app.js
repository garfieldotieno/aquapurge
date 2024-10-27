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
function OrgCard({ name, description, thumbnailUrl, cleanupType, cleanupDate, onSelect }) {
    return (
        <div className="org-card">
            <div className="org-card-content">
                <div className="org-card-text">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p className={cleanupType === "Last clean up" ? "last-cleanup" : "next-cleanup"}>
                        {cleanupType}: <strong>{cleanupDate}</strong>
                    </p>
                </div>
                <div className="org-card-thumbnail">
                    <img src={thumbnailUrl} alt={`${name} thumbnail`} />
                </div>
            </div>
            <div className="org-card-button-container">
                <button className="more-btn" onClick={onSelect}>More</button>
            </div>
        </div>
    );
}

// OrgContainer component with responsive layout and dynamic dates
function OrgContainer({ onOrgSelect }) {
    const [isNarrow, setIsNarrow] = React.useState(window.innerWidth < 777);

    React.useEffect(() => {
        function handleResize() {
            setIsNarrow(window.innerWidth < 777);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentDate = new Date();
    const cleanupDates = [
        new Date(currentDate.getFullYear(), 3, 15),  // April 15
        new Date(currentDate.getFullYear(), 6, 20),  // July 20
        new Date(currentDate.getFullYear(), 10, 10), // November 10
        new Date(currentDate.getFullYear(), 11, 5)   // December 5
    ];

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const getCleanupInfo = (date) => {
        if (date < currentDate) {
            return { type: "Last clean up", date: formatDate(date) };
        } else {
            return { type: "Next clean up", date: formatDate(date) };
        }
    };

    return (
        <div className={`org-container ${isNarrow ? 'vertical' : 'horizontal'}`}>
            {cleanupDates.map((date, index) => {
                const cleanupInfo = getCleanupInfo(date);
                const org = {
                    name: `Org ${index + 1}`,
                    description: `Description for Org ${index + 1}`,
                    thumbnailUrl: `static/logo${index + 1}.jpeg`,
                    cleanupType: cleanupInfo.type,
                    cleanupDate: cleanupInfo.date
                };
                return (
                    <OrgCard 
                        key={index}
                        {...org}
                        onSelect={() => onOrgSelect(org)}
                    />
                );
            })}
        </div>
    );
}

// Main section component
function MainSection({ onOrgSelect }) {
    return (
        <section className="main">
            <h2 className="centerdH2">Organizations</h2>
            <OrgContainer onOrgSelect={onOrgSelect} />
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

// OrgInfoComponent
function OrgInfoComponent({ org, onBack }) {
    console.log("Rendering OrgInfoComponent with org:", org);  // Add this line
    return (
        <div className="org-info">
            <button className="back-btn" onClick={onBack}>Back</button>
            <h2>{org.name}</h2>
            <img src={org.thumbnailUrl} alt={org.name} className="org-info-image" />
            <p>{org.description}</p>
            <p className={org.cleanupType === "Last clean up" ? "last-cleanup" : "next-cleanup"}>
                {org.cleanupType}: <strong>{org.cleanupDate}</strong>
            </p>
            {/* Add more details as needed */}
        </div>
    );
}


// Main App component
function App() {
    const [selectedOrg, setSelectedOrg] = React.useState(null);

    console.log("Selected Org:", selectedOrg);  // Add this line

    return (
        <div className="app">
            <Navbar />
            <div className="content-wrapper">
                {selectedOrg ? (
                    <OrgInfoComponent org={selectedOrg} onBack={() => setSelectedOrg(null)} />
                ) : (
                    <div>
                        <SummarySection />
                        <MainSection onOrgSelect={setSelectedOrg} />
                    </div>
                )}
            </div>
            <FooterSection />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));
