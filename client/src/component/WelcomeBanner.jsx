import PropTypes from 'prop-types';

function WelcomeBanner({ header, semiHeader, description }) {
    return (
        <div className="bg-lightwhite h-72 ">
            <div className="pl-3 pr-3">
                <div className="flex justify-between items-center h-72">
                    <div className="flex flex-col md:pl-32 ">
                        <span className="text-8xl text-center">{header}</span>
                        <hr />
                        <span className="text-5xl">{semiHeader}</span>
                    </div>
                    <div className="flex flex-col 2xl:pr-32 text-xl ">{description}</div>
                </div>
            </div>
        </div>
    );
}

WelcomeBanner.propTypes = {
    header: PropTypes.string,
    semiHeader: PropTypes.string,
    description: PropTypes.any,
};

export default WelcomeBanner;
