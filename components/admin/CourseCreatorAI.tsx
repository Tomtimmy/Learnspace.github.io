
import React, { useState } from 'react';
import { generateCourseOutline } from '../../services/geminiService';
import { Module } from '../../types';
import { SparklesIcon } from '../icons';

const CourseCreatorAI: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [modules, setModules] = useState<Module[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setIsLoading(true);
        setError(null);
        setModules([]);

        try {
            const generatedModules = await generateCourseOutline(topic);
            setModules(generatedModules);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-2 text-primary" />
                AI-Powered Course Outline Generator
            </h2>
            <p className="text-gray-600 mb-6">Enter a course topic, and our AI will generate a structured outline with modules and lessons for you in seconds.</p>

            <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-8">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'Introduction to Python Programming'"
                    className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-dark transition duration-300 flex items-center justify-center disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : 'Generate'}
                </button>
            </form>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}

            {modules.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold mb-4">Generated Course Outline for "{topic}"</h3>
                    <div className="space-y-4">
                        {modules.map((module) => (
                            <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-lg text-primary">{module.title}</h4>
                                <ul className="list-disc list-inside mt-2 ml-4 space-y-1 text-gray-700">
                                    {module.lessons.map((lesson) => (
                                        <li key={lesson.id}>
                                            <strong>{lesson.title}:</strong> {lesson.content}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseCreatorAI;