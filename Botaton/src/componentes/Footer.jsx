function Footer() {
    const currentYear = new Date().getFullYear();
    const direccion = "Mario Kreutzberger 1531";
    const mapsUrl = `https://maps.app.goo.gl/auLZk1RjRzgNCV9B7`;

    return (
        <footer className="text-center py-4 text-white footer-fixed-bottom" style={{ backgroundColor: '#e2303a' }}>
            <div className="container-fluid">   
                <p>&copy; {currentYear} Teletón - Todos los derechos reservados</p>
                <p>
                    <a 
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-decoration-underline"
                >
                        Fundación Teletón - {direccion}
                    </a>
                </p>
                <div className="mt-2">
                </div>
            </div>
        </footer>
    );
}

export default Footer;