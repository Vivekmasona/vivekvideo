#!/usr/bin/env node

'use strict'

const ytdl = require('ytdl-core')
const FFmpeg = require('fluent-ffmpeg')
const { PassThrough } = require('stream')
const fs = require('fs')
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query

  const youtubeUrl = query.url
  const file = query.link

  if (!youtubeUrl) {
    res.statusCode = 400
    res.end('Error: youtube url not specified')
    return
  }

  streamify(youtubeUrl, file).pipe(res)
})

server.listen(8080, () => {
  console.log('Server is listening on port 8080')
})

function streamify(uri, link) {
  const opt = {
    videoFormat: 'mp4',
    quality: 'lowest',
    audioFormat: 'mp3',
    filter(format) {
      return format.container === opt.videoFormat && format.audioBitrate
    }
  }

  const video = ytdl(uri, opt)
  const stream = link ? fs.createWriteStream(link) : new PassThrough()
  const ffmpeg = new FFmpeg(video)

  process.nextTick(() => {
    const output = ffmpeg.format(opt.audioFormat).pipe(stream)

    ffmpeg.once('error', (error) => stream.emit('error', error))
    output.once('error', (error) => {
      video.end()
      stream.emit('error', error)
    })
  })

  stream.video = video
  stream.ffmpeg = ffmpeg

  return stream
}

