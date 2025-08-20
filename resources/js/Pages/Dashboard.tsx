import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/data';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TaskStatus } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface IActiveTasks {
    data: {
        id: number;
        name: string;
        status: TaskStatus;
        due_date: string;
        project: { id: string; name: string };
    }[];
}
interface IDashboard {
    auth: any;
    totalPendingTasks: number;
    myPendingTasks: number;
    totalProgressTasks: string;
    myProgressTasks: string;
    totalCompletedTasks: string;
    myCompletedTasks: string;
    activeTasks: IActiveTasks;
}

export default function Dashboard({
    auth,
    totalPendingTasks,
    myPendingTasks,
    totalProgressTasks,
    myProgressTasks,
    totalCompletedTasks,
    myCompletedTasks,
    activeTasks,
}: IDashboard) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-amber-500">
                                Pending Tasks
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{myPendingTasks}</span>/
                                <span className="ml-2">
                                    {totalPendingTasks}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-blue-500">
                                In Progress Tasks
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{myProgressTasks}</span>/
                                <span className="ml-2">
                                    {totalProgressTasks}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-2xl font-semibold text-green-500">
                                Completed Tasks
                            </h3>
                            <p className="mt-4 text-xl">
                                <span className="mr-2">{myCompletedTasks}</span>
                                /
                                <span className="ml-2">
                                    {totalCompletedTasks}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl font-semibold text-gray-200">
                                My Active Tasks
                            </h3>

                            <table className="mt-3 w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">
                                            Project Name
                                        </th>
                                        <th className="px-3 py-3">Name</th>
                                        <th className="px-3 py-3">Status</th>
                                        <th className="px-3 py-3">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTasks.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-3 py-4 text-center text-gray-400"
                                            >
                                                No active tasks
                                            </td>
                                        </tr>
                                    ) : (
                                        activeTasks.data.map((task) => (
                                            <tr key={task.id}>
                                                <td className="px-3 py-2">
                                                    {task.id}
                                                </td>
                                                <td className="px-3 py-2 text-white hover:underline">
                                                    <Link
                                                        href={route(
                                                            'project.show',
                                                            task.project.id,
                                                        )}
                                                    >
                                                        {task.project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2 text-white hover:underline">
                                                    <Link
                                                        href={route(
                                                            'task.show',
                                                            task.id,
                                                        )}
                                                    >
                                                        {task.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <span
                                                        className={`rounded px-2 py-1 text-nowrap text-white ${
                                                            TASK_STATUS_CLASS_MAP[
                                                                task.status
                                                            ]
                                                        }`}
                                                    >
                                                        {
                                                            TASK_STATUS_TEXT_MAP[
                                                                task.status
                                                            ]
                                                        }
                                                    </span>
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {new Date(
                                                        task.due_date,
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
