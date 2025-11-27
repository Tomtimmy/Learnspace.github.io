import React, { useState } from 'react';
import { MOCK_TRANSACTIONS, MOCK_PAYOUTS } from '../../data/mock';
import { Transaction, Payout } from '../../types';

const statusColors: { [key: string]: string } = {
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Paid: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Refunded: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Failed: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const AdminPaymentsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('transactions');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">Payments &amp; Revenue</h1>
                <p className="mt-2 text-base text-text-muted-light dark:text-text-muted-dark">
                    Track student transactions and manage instructor payouts.
                </p>
            </div>
            <div className="border-b border-border-light dark:border-border-dark">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('transactions')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'transactions' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light hover:text-text-light'}`}>
                        Student Transactions
                    </button>
                    <button onClick={() => setActiveTab('payouts')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'payouts' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light hover:text-text-light'}`}>
                        Instructor Payouts
                    </button>
                </nav>
            </div>

            {activeTab === 'transactions' && (
                <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                    <div className="p-4 border-b border-border-light dark:border-border-dark">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">All Transactions ({MOCK_TRANSACTIONS.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Student</th>
                                    <th scope="col" className="px-6 py-3">Course</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_TRANSACTIONS.map(tx => (
                                    <tr key={tx.id} className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
                                        <td className="px-6 py-4 font-medium text-text-light dark:text-text-dark whitespace-nowrap">{tx.studentName}</td>
                                        <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{tx.courseTitle}</td>
                                        <td className="px-6 py-4 font-semibold text-text-light dark:text-text-dark">${tx.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{tx.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[tx.status]}`}>{tx.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'payouts' && (
                 <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                    <div className="p-4 border-b border-border-light dark:border-border-dark">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark">All Payouts ({MOCK_PAYOUTS.length})</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase bg-background-light dark:bg-background-dark">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Instructor</th>
                                    <th scope="col" className="px-6 py-3">Period</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_PAYOUTS.map(payout => (
                                    <tr key={payout.id} className="border-b border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark">
                                        <td className="px-6 py-4 font-medium text-text-light dark:text-text-dark whitespace-nowrap">{payout.instructorName}</td>
                                        <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{payout.period}</td>
                                        <td className="px-6 py-4 font-semibold text-text-light dark:text-text-dark">${payout.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-text-muted-light dark:text-text-muted-dark">{payout.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[payout.status]}`}>{payout.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {payout.status === 'Pending' && (
                                                <button className="text-primary hover:underline font-medium">Mark as Paid</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPaymentsPage;