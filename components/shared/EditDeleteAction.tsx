"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = useCallback(() => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  }, [itemId, router]);

  const handleDelete = useCallback(async () => {
    if (type === "Question") {
      // Delete question
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    } else if (type === "Answer") {
      // Delete answer
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
  }, [itemId, pathname, type]);

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
