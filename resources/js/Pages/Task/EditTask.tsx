import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface IEditTaskInfo {
    task: {
        id: number;
        image_path: string | null;
        name: string;
        status: string;
        description: string;
        due_date: string;
        project_id: string;
        priority: string;
        assigned_user_id: string;
    };
    projects: { data: { id: number; name: string }[] };
    users: { data: { id: number; name: string }[] };
}
export const EditTask = ({ task, projects, users }: IEditTaskInfo) => {
    const { data, setData, post, errors } = useForm<{
        project_id: string;
        image: File | null;
        name: string;
        description: string;
        due_date: string;
        status: string;
        priority: string;
        assigned_user_id: string;
        _method: string;
    }>({
        project_id: task.project_id || '',
        image: null,
        name: task.name || '',
        description: task.description || '',
        due_date: task.due_date || '',
        status: task.status || '',
        priority: task.priority || '',
        assigned_user_id: task.assigned_user_id || '',
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('task.update', task.id));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        Edit Task "{task.name}"
                    </h2>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800"
                        >
                            <div className="mb-4">
                                <img
                                    src={
                                        task.image_path ||
                                        'https://placehold.co/60x40?text=no_img'
                                    }
                                    alt=""
                                    className="w-64"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_project_id"
                                    value="Project"
                                />

                                <SelectInput
                                    name="project_id"
                                    id="task_project_id"
                                    className="mt-1 block w-full"
                                    value={data.project_id}
                                    onChange={(e) =>
                                        setData('project_id', e.target.value)
                                    }
                                >
                                    <option value="">Select Project</option>
                                    {projects.data.map((project) => (
                                        <option
                                            value={project.id}
                                            key={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    ))}
                                </SelectInput>

                                <InputError
                                    message={errors.project_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_image_path"
                                    value="Task Image"
                                />
                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:file:bg-gray-600 dark:file:text-gray-100 dark:hover:file:bg-gray-500"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.image}
                                    className="mt-1"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Task Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="task_name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_description"
                                    value="Task Description"
                                />
                                <TextAreaInput
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block h-40 w-full resize-none"
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_due_date"
                                    value="Task Deadline"
                                />

                                <TextInput
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('due_date', e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.due_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_status"
                                    value="Task Status"
                                />

                                <SelectInput
                                    name="status"
                                    id="task_status"
                                    value={data.status}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>

                                <InputError
                                    message={errors.status}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_priority"
                                    value="Task Priority"
                                />

                                <SelectInput
                                    name="priority"
                                    id="task_priority"
                                    value={data.priority}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('priority', e.target.value)
                                    }
                                >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>

                                <InputError
                                    message={errors.priority}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="task_assigned_user"
                                    value="Assigned User"
                                />

                                <SelectInput
                                    name="assigned_user_id"
                                    id="task_assigned_user"
                                    value={data.assigned_user_id}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            'assigned_user_id',
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Select User</option>
                                    {users.data.map((user) => (
                                        <option value={user.id} key={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </SelectInput>

                                <InputError
                                    message={errors.assigned_user_id}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route('task.index')}
                                    className="mr-2 rounded bg-gray-100 px-3 py-1 text-gray-800 shadow transition-all hover:bg-gray-200"
                                >
                                    Cancel
                                </Link>
                                <button className="cursor-pointer rounded bg-emerald-500 px-3 py-1 text-white shadow transition-all hover:bg-emerald-600">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default EditTask;
