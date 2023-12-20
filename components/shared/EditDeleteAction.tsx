"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src="/assets/icons/edit.svg"
                alt="Edit"
                width={14}
                height={14}
                className="cursor-pointer object-contain"
                onClick={handleEdit}
              />
            </TooltipTrigger>
            <TooltipContent className="text-dark300_light700">
              Edit {type}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Image
              src="/assets/icons/trash.svg"
              alt="Delete"
              width={14}
              height={14}
              className="cursor-pointer object-contain"
              onClick={handleDelete}
            />
          </TooltipTrigger>
          <TooltipContent className="text-dark300_light700">
            Delete {type}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default EditDeleteAction;
