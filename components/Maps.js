"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import React, { useEffect } from "react";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

export default function Maps({ data_mps, data_sch_maps }) {
    //console.log(data_mps);    
    /*function getloc(){
        var geocoder = L.Control.Geocoder.nominatim();
        const address = 'JALAN.RAYA MENGANTI 398 SURABAYA';
        geocoder.geocode(address, (resultArray) => {
            if (resultArray.length > 0) {
                const result = resultArray[0];
                const latlng = result.center;
                console.log(latlng);
            }
        });
    }

    useEffect(() => {
        getloc();
    });*/
   
    return (
        <MapContainer
            center={[-2.548926, 118.0148634]}
            zoom={4}
            scrollWheelZoom={true}
            style={{ height: "335px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data_mps &&
                data_mps.map((item_mps, index_mps) => {
                    let position_maps = '';
                    if(item_mps.hospital_location){
                        let ltg = null;
                        ltg = item_mps.hospital_location.split(",");

                        if(ltg){
                            position_maps = [ltg[0], ltg[1]];
                        } else {
                            position_maps = [-2.548926, 118.0148634];
                        }
                    }
                    else {
                        position_maps = [-2.548926, 118.0148634];
                    }

                    let number = item_mps.total_value;
                    let nf_val = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

                    return (
                        <div key={index_mps}>
                            <Marker position={position_maps}>
                                <Popup>
                                    <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item_mps.outlet_name}</span><br />
                                    Alamat : {item_mps.outlet_address} <br />
                                    
                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Kota : {item_mps.outlet_city}</span> <br />
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Provinsi : {item_mps.outlet_province}</span> <br />
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Telp : {item_mps.hospital_phone}</span> <br />
                                    <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Value Tahun : {item_mps.tahun_trans}  Rp. {nf_val}</span>
                                </Popup>
                            </Marker>
                        </div>
                    );
                })}

            {data_sch_maps &&
                data_sch_maps.map((item_sch_mps, index_sch_mps) => {
                    //var ltg_sch_mps = item_sch_mps.hospital_location.split(",");

                    let position_maps_sch = '';
                    if (item_sch_mps.hospital_location) {
                        let ltg_sch = null;
                        ltg_sch = item_sch_mps.hospital_location.split(",");

                        if (ltg_sch) {
                            position_maps_sch = [ltg_sch[0], ltg_sch[1]];
                        } else {
                            position_maps_sch = [-2.548926, 118.0148634];
                        }
                    }
                    else {
                        position_maps_sch = [-2.548926, 118.0148634];
                    }

                    let number_sch_mps = item_sch_mps.total_value;
                    let nf_val_sch_mps = number_sch_mps.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

                    return (
                        <div key={index_sch_mps}>
                            <Marker position={position_maps_sch}>
                                <Popup>
                                    <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item_sch_mps.outlet_name}</span><br />
                                    Alamat : {item_sch_mps.outlet_address} <br />

                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Kota : {item_sch_mps.outlet_city}</span> <br />
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Provinsi : {item_sch_mps.outlet_province}</span> <br />
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Telp : {item_sch_mps.hospital_phone}</span> <br />
                                    <span className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Value Tahun : {item_sch_mps.tahun_trans}  Rp. {nf_val_sch_mps}</span>
                                </Popup>
                            </Marker>
                        </div>
                    );
                })}
                  
        </MapContainer>
    );
}
