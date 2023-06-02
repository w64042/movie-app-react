import React, { useState } from 'react';

// enum in future will be replaced by api call
enum PlanOptions {
    BASIC = 'Basic',
    STANDARD = 'Standard',
    PREMIUM = 'Premium',
}

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedPlan, setSelectedPlan] = useState(PlanOptions.BASIC);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlan(e.target.value as PlanOptions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // todo

        // Reset form
        setName('');
        setEmail('');
        setSelectedPlan(PlanOptions.BASIC);
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Imie:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Wybierz swój plan:</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="basic"
                            value={PlanOptions.BASIC}
                            checked={selectedPlan === PlanOptions.BASIC}
                            onChange={handlePlanChange}
                        />
                        <label className="form-check-label" htmlFor="basic">
                            Basic
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="standard"
                            value={PlanOptions.STANDARD}
                            checked={selectedPlan === PlanOptions.STANDARD}
                            onChange={handlePlanChange}
                        />
                        <label className="form-check-label" htmlFor="standard">
                            Standard
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="premium"
                            value={PlanOptions.PREMIUM}
                            checked={selectedPlan === PlanOptions.PREMIUM}
                            onChange={handlePlanChange}
                        />
                        <label className="form-check-label" htmlFor="premium">
                            Premium
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Załóż konto</button>
            </form>
        </div>
    );
};

export default Register;