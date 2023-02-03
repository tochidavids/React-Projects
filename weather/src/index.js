import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles/style.css";

let currentLon;
let currentLat;

let lon;
let lat;

function setGeo() {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				currentLon = position.coords.longitude;
				currentLat = position.coords.latitude;
				return resolve([currentLon, currentLat]);
			});
		} else {
			return reject(null);
		}
	});
}

function Sidebar() {
	const [code, setCode] = useState("");
	const [codeSet, setCodeSet] = useState(false);

	const [temp, setTemp] = useState();
	const [label, setLabel] = useState();
	const [date, setDate] = useState();
	const [location, setLocation] = useState()

	useEffect(() => {
		async function setCurrent() {
			const both = await setGeo();
			lon = both[0];
			lat = both[1];
			console.log("lon:", lon, "lat:", lat);

			let data = await getData(lon, lat);
			console.log(data);

			let imgcode = weathercode(data);
			setCode(imgcode);
			setCodeSet(true);

			let label = imgcode.replace(/([A-Z])/g, " $1").trim();
			setLabel(label);
			console.log(label, "label");

			let current_temp = data.current_weather.temperature;
			setTemp(Math.round(current_temp));

			let date = new Date(
				data.current_weather.time.split("T")[0],
			).toString("ddd, d MMM");
			setDate(date);
		}

		setCurrent();

		const getData = async (lon, lat) => {
			const res = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode&current_weather=true&timezone=GMT`,
			);
			const data = await res.json();
			return data;
		};
	}, [code, temp, label]);

	const InsideSection = () => {
		return (
			<>
				<div className="top">
					<button className="places">Search for places</button>
					<button className="current">
						<i className="fa-solid fa-location-crosshairs fa-xl"></i>
					</button>
				</div>
				<div className="background">
					<img
						src={require("./media/Cloud-background.png")}
						alt="Cloud Background"
					/>
				</div>
				<div className="image">
					{codeSet ? (
						<img src={require(`./media/${code}.png`)} alt="" />
					) : (
						""
					)}
				</div>
				<div className="temp">
					{codeSet ? <span>{temp}</span> : ""}
					<i>&#176;C</i>
				</div>
				<div className="label">
					{codeSet ? <span>{label}</span> : ""}
				</div>
				<div className="date">
					<span>Today</span> <i className="fa-solid fa-circle"></i>
					{codeSet ? <span>{date}</span> : ""}
				</div>
				<div className="location">
				<i className="fa-solid fa-location-dot"></i>
				</div>
			</>
		);
	};

	return (
		<section className="sidebar">
			<InsideSection />
		</section>
	);
}

function weathercode(data) {
	const code = data.current_weather.weathercode;
	let img;
	if (code === 0) {
		img = "Clear";
	} else if (code < 3) {
		img = "LightCloud";
	} else if (code === 3) {
		img = "HeavyCloud";
	} else if ((code > 50 && code < 56) || code === 61) {
		img = "LightRain";
	} else if (
		code === 56 ||
		code === 57 ||
		code === 66 ||
		code === 67 ||
		code === 85 ||
		code === 86
	) {
		img = "Sleet";
	} else if (code === 63 || code === 65) {
		img = "HeavyRain";
	} else if (code > 70 && code < 76) {
		img = "Snow";
	} else if (code === 77) {
		img = "Hail";
	} else if (code > 79 && code < 84) {
		img = "Showers";
	} else if (code === 95 || code === 96 || code === 99) {
		img = "Thunderstorm";
	} else {
		return console.error("Invalid Weather Code");
	}
	return img;
}

const sidebar = createRoot(document.querySelector("#sidebar"));
sidebar.render(<Sidebar />);

// fetch(
// 	`https://nominatim.openstreetmap.org/?addressdetails=1&q=London&format=json&limit=1`,
// 	{
// 		method: "GET",
// 	},
// )
// 	.then(res => res.json())
// 	.then(data => console.log(data))
// 	.catch(error => console.error(error));
