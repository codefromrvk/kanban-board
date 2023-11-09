
interface BaseDataType {
    _id: string, name: string, description: string, status: string
}
export interface BoardDataType {
    todo: BaseDataType[];
    inProgress: BaseDataType[];
    completed: BaseDataType[];
    board: BaseDataType[];
}