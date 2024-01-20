import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerDiary = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Diary, 'id'>;
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly imageUrl?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyDiary = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Diary, 'id'>;
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly imageUrl?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Diary = LazyLoading extends LazyLoadingDisabled ? EagerDiary : LazyDiary

export declare const Diary: (new (init: ModelInit<Diary>) => Diary) & {
  copyOf(source: Diary, mutator: (draft: MutableModel<Diary>) => MutableModel<Diary> | void): Diary;
}