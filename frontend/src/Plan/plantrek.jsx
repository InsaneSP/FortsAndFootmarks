import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
    faTrash,
    faMinus,
    faShareAlt,
    faSave,
    faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import { useAuth } from "../Context/authContext.js";
import axios from "axios";
import "./plantrek.css";

const Plan = () => {
    const [itinerary, setItinerary] = useState([
        { day: "Day 1", activities: [""] },
    ]);
    const [notes, setNotes] = useState("");
    const [expenses, setExpenses] = useState([{ item: "", amount: 0 }]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [forts, setForts] = useState([]);
    const [fortTimeline, setFortTimeline] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useAuth();
    const [shareButtons, setShareButtons] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchForts = async () => {
            try {
                // const response = await axios.get("http://localhost:3001/forts");
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/forts`);
                setForts(response.data);
                if (response.data.length > 0) {
                    setFortTimeline(response.data[0]);
                }
            } catch (error) {
                console.error("Error fetching forts:", error);
            }
        };
        fetchForts();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const filtered = forts.filter((fort) =>
            fort.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filtered.length > 0) {
            setFortTimeline(filtered[0]);
            setError("");
        } else {
            setFortTimeline(null);
            setError("Fort not found! Please try another name.");
        }
    };

    // Functions for itinerary
    const handleAddActivity = (dayIndex) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[dayIndex].activities.push("");
        setItinerary(updatedItinerary);
    };

    const handleActivityChange = (dayIndex, activityIndex, value) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[dayIndex].activities[activityIndex] = value;
        setItinerary(updatedItinerary);
    };

    const handleDeleteActivity = (dayIndex, activityIndex) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[dayIndex].activities.splice(activityIndex, 1);
        setItinerary(updatedItinerary);
    };

    const handleAddDay = () => {
        setItinerary([
            ...itinerary,
            { day: `Day ${itinerary.length + 1}`, activities: [""] },
        ]);
    };

    const handleAddExpense = () => {
        setExpenses([...expenses, { item: "", amount: 0 }]);
    };

    const handleExpenseChange = (index, field, value) => {
        const updatedExpenses = [...expenses];
        updatedExpenses[index][field] =
            field === "amount" ? parseFloat(value) || 0 : value;
        setExpenses(updatedExpenses);
        setTotalExpense(
            updatedExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        );
    };

    const handleDeleteExpense = (index) => {
        const updatedExpenses = [...expenses];
        updatedExpenses.splice(index, 1);
        setExpenses(updatedExpenses);
        setTotalExpense(
            updatedExpenses.reduce((sum, expense) => sum + expense.amount, 0)
        );
    };

    const handleSharePlan = () => {
        if (!user) {
            alert("You must log in to share the trek plan.");
            return;
        }

        if (user) {
            setShareButtons(true);
        }

        const shareableContent = `
    Trek Plan:
    
    Itinerary:
    ${itinerary.map(day => `${day.day}: ${day.activities.join(", ")}`).join("\n")}
    
    Notes:
    ${notes}
    
    Expenses:
    ${expenses.map(expense => `${expense.item}: ₹${expense.amount}`).join("\n")}
    
    Total Expense: ₹${totalExpense.toFixed(2)}
        `;

        navigator.clipboard
            .writeText(shareableContent)
            .then(() => alert("Trek Plan copied to clipboard for sharing!"))
            .catch(() => alert("Failed to copy Trek Plan to clipboard."));
    };


    const handleSavePlanAsPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        let yPos = 10;

        // Add itinerary
        doc.text("Trek Plan", 10, yPos);
        yPos += 10; // Move to the next line

        doc.text("Itinerary:", 10, yPos);
        yPos += 10; // Move to the next line
        itinerary.forEach((day, i) => {
            doc.text(`${day.day}: ${day.activities.join(", ")}`, 10, yPos);
            yPos += 10; // Adjust y position for the next item
        });

        // Add notes
        doc.text("Notes:", 10, yPos);
        yPos += 10;
        doc.text(notes, 10, yPos);
        yPos += 10 + notes.split("\n").length * 5; // Adjust y position based on the length of notes

        // Add expenses
        doc.text("Expenses:", 10, yPos);
        yPos += 10;
        expenses.forEach((expense, i) => {
            doc.text(`${expense.item}: ₹${expense.amount}`, 10, yPos);
            yPos += 10; // Adjust y position for the next item
        });

        // Add total expense
        doc.setFont("Helvetica", "normal");
        doc.text(`Total Expense: ₹${totalExpense.toFixed(2)}`, 10, yPos);

        // Save PDF
        doc.save("TrekPlan.pdf");
    };

    return (
        <div className="container-fluid about-us-container">
            <h1 className="heading">Plan Your Trek</h1>
            <div className="section">
                {/* Left Container - Itinerary */}
                <div className="left-container">
                    <div className="card plan-card itinerary no-hover">
                        <h4 className="card-heading">Itinerary</h4>
                        {itinerary.map((day, dayIndex) => (
                            <div className="itinerary-day" key={dayIndex}>
                                <div className="day-header">
                                    <span>{day.day}</span>
                                    <button
                                        className="btn delete"
                                        onClick={() => {
                                            const updatedItinerary = itinerary.filter(
                                                (_, i) => i !== dayIndex
                                            );
                                            setItinerary(updatedItinerary);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                                {day.activities.map((activity, activityIndex) => (
                                    <div className="activity-input" key={activityIndex}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Activity ..."
                                            value={activity}
                                            onChange={(e) =>
                                                handleActivityChange(
                                                    dayIndex,
                                                    activityIndex,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <button
                                            className="btn delete"
                                            onClick={() =>
                                                handleDeleteActivity(dayIndex, activityIndex)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="btn add-activity"
                                    onClick={() => handleAddActivity(dayIndex)}
                                >
                                    + Add Activity
                                </button>
                            </div>
                        ))}
                        <button className="btn add-day" onClick={handleAddDay}>
                            + Add Day
                        </button>
                    </div>
                </div>

                {/* Right Container - Notes */}
                <div className="right-container">
                    <div className="notes">
                        <div className="card plan-card no-hover">
                            <h4 className="card-heading">Notes</h4>
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Enter your Trek Notes Here...."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Historical Timeline */}
            <div className="section">
                <div className="left-container">
                    <div className="card plan-card itinerary no-hover">
                        <h4 className="timeline-heading">Historical Timeline</h4>
                        <div className="search-container">
                            <form onSubmit={handleFormSubmit} className="d-flex">
                                <input
                                    type="text"
                                    className="form-control search"
                                    placeholder="Search Forts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {fortTimeline ? (
                            <div className="timeline-content">
                                <h2 className="fort-name">{fortTimeline.name}</h2>
                                <ul className="timeline-list">
                                    {fortTimeline.history?.historicalTimeline?.map(
                                        (timeline, index) => (
                                            <li className="timeline-item" key={index}>
                                                <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    className="icon"
                                                />
                                                <span>
                                                    <strong>{timeline.year}:</strong> {timeline.event}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ) : (
                            <p>No timeline data available.</p>
                        )}
                    </div>
                </div>

                {/* Right Container - Expense Tracker */}
                <div className="right-container">
                    <div className="expense">
                        <div className="card plan-card no-hover">
                            <h4 className="card-heading">Expense Tracker</h4>
                            {expenses.map((expense, index) => (
                                <div className="input-fields" key={index}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Item"
                                        value={expense.item}
                                        onChange={(e) =>
                                            handleExpenseChange(index, "item", e.target.value)
                                        }
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Amount"
                                        value={expense.amount}
                                        onChange={(e) =>
                                            handleExpenseChange(index, "amount", e.target.value)
                                        }
                                    />
                                    <button
                                        className="btn delete"
                                        onClick={() => handleDeleteExpense(index)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            ))}
                            <button className="btn add-expense" onClick={handleAddExpense}>
                                + Add Expense
                            </button>
                            <div className="total-expense">
                                Total: ₹ {totalExpense.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Share and Save */}
            <div className="action-buttons" style={{margin: "15px 5% 15px auto"}}>
                <button className="action-btn share" onClick={handleSharePlan}>
                    <FontAwesomeIcon icon={faShareAlt} /> Share Trek Plan
                </button>
                <button className="action-btn save" onClick={handleSavePlanAsPDF}>
                    <FontAwesomeIcon icon={faSave} /> Save Trek Plan
                </button>
            </div>

            {/* Social Media Share Buttons (requires login) */}
            {shareButtons && (
                <div className="social-share" style={{margin: "15px 5% 15px auto"}}>
                    <FacebookShareButton
                        url={window.location.href}
                        className="social-button fb"
                    >
                        <FontAwesomeIcon icon={faFacebook} /> Share on Facebook
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={window.location.href}
                        className="social-button twitter"
                    >
                        <FontAwesomeIcon icon={faTwitter} /> Share on Twitter
                    </TwitterShareButton>
                    <WhatsappShareButton
                        url={window.location.href}
                        className="social-button whatsapp"
                    >
                        <FontAwesomeIcon icon={faWhatsapp} /> Share on WhatsApp
                    </WhatsappShareButton>
                </div>
            )}
        </div>
    );
};

export default Plan;
