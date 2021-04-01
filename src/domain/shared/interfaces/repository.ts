export interface IRepository<TIdType, TType> {
	create(entity: Partial<TType>): Promise<TType>;
	getAll(): Promise<Array<TType>>;
	get(id: TIdType): Promise<TType>;
	save(entity: Partial<TType>): Promise<TType>;
	delete(id: TIdType): Promise<boolean>;
}
