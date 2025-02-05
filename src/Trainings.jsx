import React, { useState, useEffect } from "react";
import { fetchTrainings } from "./services/trainingService";

function Trainings() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        loadTrainings();
    }, []);

    const loadTrainings = async () => {
        try {
            const data = await fetchTrainings();
            setTrainings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Trainings list</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {trainings.map((training) => (
                    <li key={training.id}>
                        {training.type}, {training.duration} hrs. <br />
                        {training.calories_burnt} cal <br />
                        {training.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Trainings;
