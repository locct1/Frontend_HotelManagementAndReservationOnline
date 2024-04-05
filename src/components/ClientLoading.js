import Spinner from 'react-bootstrap/Spinner';

function ClientLoading() {
    return (
        <>
            <div className="breadcrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div>
                                <div className="client-loader text-center">
                                    Loading <Spinner animation="border" variant="primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientLoading;
