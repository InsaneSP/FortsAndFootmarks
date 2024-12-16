import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faTrash, faMinus, faShareAlt, faSave, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; 
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { useAuth } from "../Context/authContext.js";
import "./plantrek.css";

const Plan = () => {
    const [itinerary, setItinerary] = useState([{ day: "Day 1", activities: [""] }]);
    const [notes, setNotes] = useState("");
    const [expenses, setExpenses] = useState([{ item: "", amount: 0 }]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [fortTimeline, setFortTimeline] = useState([
        {
            fortName: "Raigad",
            events: [
                { year: 1656, description: "Shivaji Maharaj captures Raigad" },
                { year: 1674, description: "Coronation of Shivaji Maharaj" },
                { year: 1680, description: "Shivaji Maharaj passes away at Raigad" },
            ],
        },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    const [shareButtons, setShareButtons] = useState(false);

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
    
        // Filter timeline based on search
        const filteredTimeline = fortTimeline.filter((fort) =>
            fort.fortName.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const handleSharePlan = () => {
        if (!user) {
            alert("You must log in to share the trek plan.");
            return;
        }

        if (user){
            setShareButtons(true)
        }

        const planData = {
            itinerary,
            notes,
            expenses,
            totalExpense,
        };

        const shareableContent = JSON.stringify(planData, null, 2);
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
        yPos += 10 + (notes.split("\n").length * 5); // Adjust y position based on the length of notes
    
        // Add expenses
        doc.text("Expenses:", 10, yPos);
        yPos += 10;
        expenses.forEach((expense, i) => {
            doc.text(`${expense.item}: ₹${expense.amount}`, 10, yPos);
            yPos += 10; // Adjust y position for the next item
        });
    
        // Add total expense
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
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Search Forts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {filteredTimeline.map((fort, index) => (
                            <div className="timeline-content" key={index}>
                                <h5 className="fort-name">{fort.fortName}</h5>
                                <ul className="timeline-list">
                                    {fort.events.map((event, eventIndex) => (
                                        <li className="timeline-item" key={eventIndex}>
                                            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                                            <span>
                                                <strong>{event.year}:</strong> {event.description}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
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
            <div className="action-buttons">
                <button className="btn action-btn share" onClick={handleSharePlan}>
                    <FontAwesomeIcon icon={faShareAlt} /> Share Trek Plan
                </button>
                <button className="btn action-btn save" onClick={handleSavePlanAsPDF}>
                    <FontAwesomeIcon icon={faSave} /> Save Trek Plan
                </button>
            </div>

            {/* Social Media Share Buttons (requires login) */}
            {shareButtons && (
                <div className="social-share">
                <FacebookShareButton url={window.location.href} className="social-button">
                    <FontAwesomeIcon icon={faFacebook} /> Share on Facebook
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href} className="social-button">
                    <FontAwesomeIcon icon={faTwitter} /> Share on Twitter
                </TwitterShareButton>
                <WhatsappShareButton url={window.location.href} className="social-button">
                    <FontAwesomeIcon icon={faWhatsapp} /> Share on WhatsApp
                </WhatsappShareButton>
            </div>
            )}
        </div>
    );
};

export default Plan;
