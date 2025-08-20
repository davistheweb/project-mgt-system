import { Pagination } from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/data';
import { Link, router } from '@inertiajs/react';
import { TaskIndexProps } from './Index';

export const TasksTable = ({
    tasks,
    queryParams,
    success,
    showProjectColumn = false,
}: TaskIndexProps & {
    showProjectColumn?: boolean;
}) => {
    queryParams = queryParams || {};

    const searchFieldChanged = (name: string, value: string) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('task.index'), queryParams, {
            preserveState: true,
            replace: true,
        });
    };

    const handleKeyPress = (
        name: string,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e?.currentTarget?.value);
    };

    const sortChanged = (name: string) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('task.index'), queryParams, {
            preserveState: true,
            replace: true,
        });
    };
    const handleTaskDeletetion = (task: { id: number }) => {
        if (!window.confirm('Are you sure you want to delete this task?'))
            return;

        router.delete(route('task.destroy', task.id));
    };
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <th className="cursor-pointer px-3 py-3">Image</th>
                            {showProjectColumn && (
                                <th className="cursor-pointer">Project Name</th>
                            )}
                            <TableHeading
                                name="name"
                                sortChanged={sortChanged}
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >
                                Name
                            </TableHeading>
                            <TableHeading
                                sortChanged={sortChanged}
                                name="status"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >
                                Status
                            </TableHeading>
                            <TableHeading
                                sortChanged={sortChanged}
                                name="created_at"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >
                                Create Date
                            </TableHeading>
                            <TableHeading
                                sortChanged={sortChanged}
                                name="due_date"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >
                                Due Date
                            </TableHeading>
                            <th className="cursor-pointer px-3 py-3">
                                Created By
                            </th>
                            <th className="cursor-pointer px-3 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            {showProjectColumn && (
                                <th className="px-3 py-3"></th>
                            )}
                            <th className="px-3 py-3">
                                <TextInput
                                    className="l"
                                    placeholder="Task Name"
                                    defaultValue={queryParams.name}
                                    onBlur={(
                                        // e: React.FocusEvent,
                                        e,
                                    ) =>
                                        searchFieldChanged(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    onKeyDown={(
                                        e,
                                    ) => handleKeyPress('name', e)}
                                />
                            </th>
                            <th className="px-3 py-3">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            'status',
                                            e.target.value,
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map((task) => (
                            <tr
                                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                key={task.id}
                            >
                                <td className="px-3 py-2">{task.id}</td>
                                <td className="px-3 py-2">
                                    <img
                                        src={task.image_path}
                                        alt="task_img"
                                        className="h-[40px] w-[60px]"
                                    />
                                </td>
                                {showProjectColumn && (
                                    <td className="px-3 py-2">
                                        {`${task.project.name.length > 25 ? `${task.project.name.slice(0, 25)}...` : `${task.project.name}`}`}
                                    </td>
                                )}
                                <th className="px-3 py-2 text-nowrap text-gray-100 hover:underline">
                                    <Link href={route('task.show', task.id)}>
                                        {`${task.name.length > 25 ? `${task.name.slice(0, 25)}...` : `${task.name}`}`}
                                    </Link>
                                </th>
                                <td className="px-3 py-2">
                                    <span
                                        className={`rounded px-1.5 py-1 text-center text-[10px] text-wrap text-white select-none md:text-sm ${TASK_STATUS_CLASS_MAP[task.status]}`}
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    {task.created_at}
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    {task.due_date}
                                </td>
                                <td className="px-3 py-2">
                                    {task.createdBy.name}
                                </td>
                                <td className="px-3 py-2 text-nowrap">
                                    <Link
                                        href={route('task.edit', task.id)}
                                        className="mx-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={(e) =>
                                            handleTaskDeletetion(task)
                                        }
                                        className="mx-1 cursor-pointer font-medium text-red-600 hover:underline dark:text-red-500"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination links={tasks.meta.links} />
        </>
    );
};
