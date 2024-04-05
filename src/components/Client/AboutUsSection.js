import { NavLink, Link } from 'react-router-dom';

function AboutSection() {
    return <> <section className="aboutus-section spad">
    <div className="container">
        <div className="row">
            <div className="col-lg-6 shadow-lg p-3 mb-5 bg-white rounded">
                <div className="about-text">
                    <div className="section-title">
                        <span>Về chúng tôi</span>
                        <h2>FastTravel</h2>
                    </div>
                    <p className="f-para">
                        FastTravel là siêu ứng dụng du lịch và tiện ích sống hàng đầu Đông Nam Á, chúng
                        tôi giúp bạn khám phá và mua đa dạng các loại sản phẩm du lịch, dịch vụ địa
                        phương và dịch vụ tài chính. Danh mục sản phẩm toàn diện của FastTravel bao gồm
                        các dịch vụ đặt phương tiện đi lại như vé máy bay, xe buýt, tàu hỏa, cho thuê ô
                        tô, đưa đón sân bay, cũng như kho khách sạn chỗ ở lớn nhất Đông Nam Á. Không chỉ
                        vậy, để giúp bạn thực hiện nhiều ước vọng về phong cách sống của mình, chúng tôi
                        còn hoàn thiện các dịch vụ của mình với một loạt các điểm tham quan, hoạt động
                        địa phương cũng như các spa chăm sóc sức khỏe và sắc đẹp. Vì vậy, bất kể lựa
                        chọn lối sống của bạn là gì, bạn chỉ cần một cú nhấp chuột!.
                    </p>
                    <p className="s-para">
                        Vì vậy, khi nói đến việc đặt khách sạn hoàn hảo, nhà nghỉ cho thuê, khu nghỉ
                        dưỡng, căn hộ, nhà khách hoặc nhà trên cây, chúng tôi sẽ hỗ trợ bạn.
                    </p>
                    <Link href="#" className="primary-btn about-btn">
                        Đọc thêm
                    </Link>
                </div>
            </div>
            <div className="col-lg-6 shadow-lg p-3 mb-5 bg-white rounded">
                <div className="about-pic">
                    <div className="row">
                        <div className="col-sm-6">
                            <img src="/img/about/about-1.jpg" alt="" />
                        </div>
                        <div className="col-sm-6">
                            <img src="/img/about/about-2.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section></>;
}

export default AboutSection;
