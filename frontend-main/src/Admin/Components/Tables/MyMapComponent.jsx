import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MyMapComponent = ({ startLat, startLng, endLat, endLng }) => {

    useEffect(() => {
        // Tạo bản đồ
        const map = L.map('map').setView([startLat, startLng], 13);

        // Thêm lớp bản đồ OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Tạo icon tùy chỉnh với URL và kích thước
        const startIcon = L.icon({
            iconUrl: "/home/thanhyk14/rac/drone-order/frontend-main/maps-and-flags.png", // URL của hình ảnh icon
            iconSize: [30, 30], // Thay thế scaledSize trong Google Maps
            iconAnchor: [15, 30], // Điểm neo của icon (giữa đáy icon)
            popupAnchor: [0, -30] // Điểm neo của popup so với icon
        });

        const endIcon = L.icon({
            iconUrl: "/home/thanhyk14/rac/drone-order/frontend-main/full-moon.png", // URL khác cho điểm kết thúc
            iconSize: [40, 40], // Kích thước tùy chỉnh
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        file:///home/thanhyk14/Downloads/full-moon.png
        // Thêm marker cho điểm đầu với icon tùy chỉnh
        L.marker([startLat, startLng], { icon: startIcon }).addTo(map)
            .bindPopup('Start Point')
            .openPopup();

        // Thêm marker cho điểm cuối với icon tùy chỉnh
        L.marker([endLat, endLng], { icon: endIcon }).addTo(map)
            .bindPopup('End Point')
            .openPopup();

        // Nối hai điểm bằng một Polyline
        const latlngs = [
            [startLat, startLng],
            [endLat, endLng]
        ];

        // Thêm Polyline vào bản đồ
        const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);

        // Phóng to bản đồ vừa với polyline
        map.fitBounds(polyline.getBounds());

        // Hàm dọn dẹp
        return () => {
            map.remove();
        };
    }, [startLat, startLng, endLat, endLng]);

    return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
}

export default MyMapComponent;
