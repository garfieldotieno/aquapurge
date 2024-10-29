// Navbar component
function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="static/main/aquapurge_logo.png" alt="Logo" className="logo" />
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

// SummaryInfo component
function SummaryInfo() {
    return (
        <div className="summary-info">
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
            <h2 className="summary-title">Summary</h2>
            <SummaryInfo />
            
        </section>
    );
}

// OrgCard component with "More" button
function OrgCard({ 
    id, 
    name, 
    description, 
    thumbnailUrl, 
    cleanupType, 
    cleanupDate, 
    detailedInfo,
    onSelect 
}) {
    return (
        <div className="org-card">
            <div className="org-card-header">
                <h3>{name}</h3>
                <div className="org-card-thumbnail">
                    <img src={thumbnailUrl} alt={`${name} thumbnail`} />
                </div>
            </div>
            <div className="org-card-body">
                <p className="org-description">{description}</p>
                <p className={cleanupType === "Last clean up" ? "last-cleanup" : "next-cleanup"}>
                    {cleanupType}: <strong>{cleanupDate}</strong>
                </p>
            </div>
            <div className="org-card-button-container">
                <button 
                    className="more-btn" 
                    onClick={() => onSelect({
                        id,
                        name,
                        description,
                        thumbnailUrl,
                        cleanupType,
                        cleanupDate,
                        detailedInfo
                    })}
                >
                    More
                </button>
            </div>
        </div>
    );
}

// OrgContainer component with responsive layout and dynamic dates
function OrgContainer({ onOrgSelect }) {
    const [isNarrow, setIsNarrow] = React.useState(window.innerWidth < 777);
    const [orgs, setOrgs] = React.useState([]);

    React.useEffect(() => {
        // Fetch the mock data
        fetch('/static/mock.json')
            .then(response => response.json())
            .then(data => setOrgs(data.orgCards))
            .catch(error => console.error('Error loading organization data:', error));

        // Screen width listener
        function handleResize() {
            setIsNarrow(window.innerWidth < 777);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentDate = new Date();
    
    const getCleanupInfo = (cleanupDates) => {
        const sortedDates = cleanupDates
            .map(cleanup => ({ ...cleanup, dateObj: new Date(cleanup.date) }))
            .sort((a, b) => a.dateObj - b.dateObj);

        const nextCleanup = sortedDates.find(cleanup => cleanup.dateObj > currentDate);
        const lastCleanup = sortedDates.reverse().find(cleanup => cleanup.dateObj < currentDate);

        if (nextCleanup) {
            return {
                type: "Next clean up",
                date: nextCleanup.dateObj.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            };
        } else if (lastCleanup) {
            return {
                type: "Last clean up",
                date: lastCleanup.dateObj.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            };
        }
        
        return { type: "No cleanups scheduled", date: "N/A" };
    };

    return (
        <div className={`org-container ${isNarrow ? 'vertical' : 'horizontal'}`}>
            {orgs.map((org) => {
                const cleanupInfo = getCleanupInfo(org.cleanupDates);
                return (
                    <OrgCard 
                        key={org.id}
                        id={org.id}
                        name={org.name}
                        description={org.description}
                        thumbnailUrl={org.thumbnailUrl}
                        cleanupType={cleanupInfo.type}
                        cleanupDate={cleanupInfo.date}
                        detailedInfo={org.detailedInfo}
                        onSelect={onOrgSelect}
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
    const [footerData, setFooterData] = React.useState(null);

    React.useEffect(() => {
        fetch('/static/mock.json')
            .then(response => response.json())
            .then(data => setFooterData(data.footerInfo))
            .catch(error => console.error('Error loading footer data:', error));
    }, []);

    if (!footerData) return null;

    return (
        <footer>
            <div className="footer-content">
                <div className="footer-social">
                    <a href={footerData.social_links.twitter} target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                    <a href={footerData.social_links.instagram} target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                    <a href={footerData.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>
                <div className="footer-contact">
                    <p>Contact: {footerData.contact_email}</p>
                </div>
                <div className="footer-copyright">
                    <p>&copy; {footerData.copyright_year} {footerData.organization_name}</p>
                </div>
            </div>
        </footer>
    );
}


// OrgInfoComponent
function OrgInfoComponent({ org, onBack }) {
    if (!org || !org.detailedInfo) {
        return (
            <div className="org-info">
                <div className="back-btn-container">
                    <button className="back-btn" onClick={onBack}>Back</button>
                </div>
                <p>Loading organization information...</p>
            </div>
        );
    }

    return (
        <div className="org-info">
            <div className="back-btn-container">
                <button className="back-btn" onClick={onBack}>Back</button>
            </div>

            {/* Card 0: Main Info */}
            <div className="info-card main-info-card">
                <div className="card-header">
                    <img src={org.thumbnailUrl} alt={org.name} className="org-thumbnail" />
                    <h2>{org.name}</h2>
                </div>
                <p className="org-description">{org.description}</p>
            </div>

            {/* Card 1: Image Gallery */}
            <div className="info-card gallery-card">
                <h3>Gallery</h3>
                <div className="gallery-carousel">
                    {/* Splide implementation will go here */}
                    {org.detailedInfo.gallery.map(image => (
                        <img key={image.id} src={image.imageUrl} alt={image.caption} />
                    ))}
                </div>
            </div>

            {/* Card 2: Impact */}
            <div className="info-card impact-card">
                <h3>Impact</h3>
                <p className="mission">{org.detailedInfo.mission}</p>
                <p className="impact">{org.detailedInfo.impact}</p>
            </div>

            {/* Card 3: Location */}
            <div className="info-card location-card">
                <h3>Location</h3>
                <p>{org.detailedInfo.location_description}</p>
                <div className="map-container">
                    {/* Map implementation will go here */}
                </div>
            </div>

            {/* Card 4: Contact */}
            <div className="info-card contact-card">
                <h3>Contact</h3>
                <p>{org.detailedInfo.contactEmail}</p>
            </div>

            {/* Card 5: Activity Summary */}
            <div className="info-card activity-card">
                <h3>Activity Summary</h3>
                <div className="activity-metrics">
                    {Object.entries(org.detailedInfo.activity_summary).map(([key, value]) => (
                        <div key={key} className="metric">
                            <span className="metric-value">{value}</span>
                            <span className="metric-label">{key.replace(/_/g, ' ')}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 6: Team */}
            <div className="info-card team-card">
                <h3>Our Team</h3>
                <div className="team-grid">
                    {org.detailedInfo.team_listing.map(member => (
                        <div key={member.id} className="team-member">
                            <img src={member.image} alt={member.name} />
                            <h4>{member.name}</h4>
                            <p className="role">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 7: NFT */}
            <div className="info-card nft-card">
                <h3>NFT Information</h3>
                <p>{org.detailedInfo.purchase_nft_info.small_description}</p>
                <div className="nft-stats">
                    <span>Mints: {org.detailedInfo.purchase_nft_info.mint_count}</span>
                    <span>Votes: {org.detailedInfo.purchase_nft_info.vote_count}</span>
                </div>
            </div>

            {/* Card 8: Cleanup Listing */}
            <div className="info-card cleanup-card">
                <h3>Clean-up History</h3>
                <div className="cleanup-list">
                    {org.detailedInfo.clean_up_listing.map(cleanup => (
                        <div key={cleanup.id} className="cleanup-item">
                            <h4>{cleanup.location}</h4>
                            <p>Date: {cleanup.date}</p>
                            <p>Participants: {cleanup.participants}</p>
                            <p>Waste Collected: {cleanup.wasteCollected}</p>
                            <p>{cleanup.summary}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



// Main App component
function App() {
    const [selectedOrg, setSelectedOrg] = React.useState(null);

    return (
        <div className="app">
            <Navbar />
            <div className="content-wrapper">
                {selectedOrg ? (
                    <OrgInfoComponent 
                        org={selectedOrg} 
                        onBack={() => setSelectedOrg(null)} 
                    />
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
