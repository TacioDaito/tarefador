<?php

use Illuminate\Http\JsonResponse;

/**
 * Returns a JSON response with a success flag, data and status code.
 *
 * @param  array  $data
 * @return JsonResponse
 *
 * Defaults to 200 OK. Returns an empty array if data is not provided.
 */
function jsonResponse(array $data = [], int $status = 200): JsonResponse
{
    return response()->json(array_merge(['success' => $status < 400 ? true : false], $data), $status);
}
